import { google } from 'googleapis';

const SPREADSHEET_ID = '1klUPqlrQfqZLnSihU8h0yyirXP1vLJmTvXOND-mi4ug';
const CODES_RANGE = 'A:C'; // Columns A, B, C for codes (Sheet 1)
const QUESTIONS_RANGE = 'Hoja 2!A:B'; // Columns A, B for questions (Sheet 2)

interface SheetRow {
  code: string;
  createdDate: string;
  expirationDate: string;
}

interface QuestionRow {
  question: string;
  category: string;
}

export class GoogleSheetsService {
  private sheets;

  constructor() {
    // Initialize Google Sheets API with service account or API key
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  private parseSheetDate(dateString: string): Date {
    // Parse DD/MM/YYYY HH:MM format
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    
    // Create date object (month is 0-indexed in JavaScript)
    return new Date(year, month - 1, day, hours, minutes);
  }

  async getValidCodes(): Promise<SheetRow[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: CODES_RANGE,
      });

      const rows = response.data.values;
      if (!rows || rows.length <= 1) {
        return []; // No data or only header row
      }

      // Skip header row and map data
      const codes = rows.slice(1).map((row) => ({
        code: row[0] || '',
        createdDate: row[1] || '',
        expirationDate: row[2] || '',
      })).filter(row => row.code.trim() !== ''); // Filter out empty codes
      
      return codes;
    } catch (error) {
      console.error('Error fetching codes from Google Sheets:', error);
      throw new Error('Error al acceder a los códigos de validación');
    }
  }

  async getQuestions(): Promise<QuestionRow[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: QUESTIONS_RANGE,
      });

      const rows = response.data.values;
      if (!rows || rows.length <= 1) {
        return []; // No data or only header row
      }

      // Skip header row and map data
      const questions = rows.slice(1).map((row) => ({
        question: row[0] || '',
        category: row[1] || '',
      })).filter(row => row.question.trim() !== ''); // Filter out empty questions
      
      return questions;
    } catch (error) {
      console.error('Error fetching questions from Google Sheets:', error);
      throw new Error('Error al acceder a las preguntas');
    }
  }

  async validateCode(inputCode: string): Promise<{ valid: boolean; message?: string }> {
    try {
      const codes = await this.getValidCodes();
      const matchingCode = codes.find(
        (codeRow) => codeRow.code.toUpperCase().trim() === inputCode.toUpperCase().trim()
      );

      if (!matchingCode) {
        return { valid: false, message: 'No existe el código. Por favor contacta al administrador' };
      }

      // Get current date in Lima timezone (UTC-5)
      const currentDate = new Date();
      const limaOffset = -5 * 60; // Lima is UTC-5
      const utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);
      const limaTime = new Date(utc + (limaOffset * 60000));

      // Parse dates from sheet (format: DD/MM/YYYY HH:MM)
      const createdDate = this.parseSheetDate(matchingCode.createdDate);
      const expirationDate = this.parseSheetDate(matchingCode.expirationDate);



      // Check if dates are valid
      if (isNaN(createdDate.getTime()) || isNaN(expirationDate.getTime())) {
        return { valid: false, message: 'Código con fechas inválidas. Por favor contacta al administrador' };
      }

      if (limaTime < createdDate) {
        return { valid: false, message: 'El código aún no se ha activado. Por favor contacta al administrador' };
      }

      if (limaTime > expirationDate) {
        return { valid: false, message: 'El código ya ha expirado. Por favor contacta al administrador' };
      }

      return { valid: true };
    } catch (error) {
      console.error('Error validating code:', error);
      // Check if it's a permission error
      if (error instanceof Error && error.message.includes('permission')) {
        return { valid: false, message: 'Error de permisos al acceder a la hoja de cálculo. Por favor contacta al administrador' };
      }
      return { valid: false, message: 'Error al validar el código. Inténtalo nuevamente.' };
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();

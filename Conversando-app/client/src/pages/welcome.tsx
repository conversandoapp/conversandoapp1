import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCodeValidation } from '@/hooks/use-code-validation';
import { sessionStorage } from '@/lib/session-storage';
import { codeValidationSchema, type CodeValidationRequest } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, AlertCircle, CheckCircle, Key } from 'lucide-react';
const backgroundImage = '/background.png';

interface WelcomeProps {
  onAccessGranted: () => void;
}

export default function Welcome({ onAccessGranted }: WelcomeProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  
  const form = useForm<CodeValidationRequest>({
    resolver: zodResolver(codeValidationSchema),
    defaultValues: {
      code: '',
    },
  });

  const codeValidation = useCodeValidation();

  const onSubmit = async (data: CodeValidationRequest) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await codeValidation.mutateAsync(data);
      
      if (result.valid) {
        setSuccessMessage('¡Código válido! Iniciando experiencia...');
        sessionStorage.setAccess(data.code);
        
        setTimeout(() => {
          onAccessGranted();
        }, 1000);
      } else {
        setErrorMessage(result.message || 'Código no válido');
        setShowErrorDialog(true);
        form.setFocus('code');
      }
    } catch (error) {
      setErrorMessage('Error al validar el código. Inténtalo nuevamente.');
      setShowErrorDialog(true);
      form.setFocus('code');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden bg-[#fee0c54f]">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>
      {/* Welcome Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl animate-slide-up bg-[#275da2]">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 animate-float overflow-hidden">
              <img 
                src="/head-icon.png" 
                alt="Conversando Logo" 
                className="w-full h-full object-cover scale-x-[-1]"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-[#FEE0C5]">Conversando</h1>
            <p className="text-sm text-[#fee0c5]">Un viaje hacia el autoconocimiento</p>
          </div>

          {/* Code Input Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Código de Acceso</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="text"
                          placeholder="Ingresa tu código"
                          maxLength={50}
                          className="bg-[#FEE0C5] border-white/20 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-transparent pr-10"
                          disabled={codeValidation.isPending}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {codeValidation.isPending ? (
                            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                          ) : successMessage ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : errorMessage ? (
                            <AlertCircle className="w-5 h-5 text-red-400" />
                          ) : (
                            <Key className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Error Message */}
              {errorMessage && (
                <Alert className="bg-red-500/10 border-red-500/20 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {/* Success Message */}
              {successMessage && (
                <Alert className="bg-green-500/10 border-green-500/20 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={codeValidation.isPending}
                className="w-full bg-gradient-to-r from-[#F16856] to-[#D14836] hover:from-[#E5553F] hover:to-[#B73E2D] text-white font-medium"
              >
                {codeValidation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validando...
                  </>
                ) : (
                  'Comenzar Reflexión'
                )}
              </Button>
            </form>
          </Form>

          {/* Information */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-400 text-center">
              Si no tienes un código, contacta al administrador
            </p>
          </div>
        </div>
      </div>
      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-lg border-red-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              Error de Validación
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => setShowErrorDialog(false)}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

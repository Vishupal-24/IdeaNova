
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ShieldCheck, Zap, Rocket, Headphones, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Plan = 'monthly' | 'quarterly' | 'yearly';
type View = 'features' | 'pricing';

const plans = {
  monthly: {
    id: 'monthly',
    name: 'Monthly',
    price: '₹499',
    billing: 'billed monthly',
    value: 1,
  },
  quarterly: {
    id: 'quarterly',
    name: 'Quarterly',
    price: '₹1299',
    billing: 'billed every 3 months',
    value: 0.9,
    tag: 'Save 13%',
  },
  yearly: {
    id: 'yearly',
    name: 'Yearly',
    price: '₹2499',
    billing: 'billed annually',
    value: 0.8,
    tag: 'Best Value',
  },
};

const proFeatures = [
    { icon: Zap, text: 'Unlimited access to advanced AI features' },
    { icon: Rocket, text: 'Ultra-fast performance and priority processing' },
    { icon: Headphones, text: 'Priority, 24/7 expert support' },
    { icon: Sparkles, text: 'Early access to cutting-edge updates' },
    { icon: ShieldCheck, text: 'Rock-solid security protecting your data' },
]

type PricingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PricingDialog({ open, onOpenChange }: PricingDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');
  const [view, setView] = useState<View>('features');
  const { toast } = useToast();

  useEffect(() => {
    if (!open) {
      // Reset to features view after a short delay to allow for closing animation
      setTimeout(() => {
        setView('features');
      }, 200);
    }
  }, [open]);

  const handleSubscribe = () => {
    toast({
        title: 'Subscription Started!',
        description: `You have successfully subscribed to the ${plans[selectedPlan].name} plan.`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card">
        <DialogHeader className="text-center p-6 pb-4">
          <DialogTitle className="font-headline text-3xl md:text-4xl">Unlock Pro Today—Transform Your Experience Instantly!</DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground max-w-xl mx-auto">
            Imagine having every tool you need at your fingertips.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-0">
          {view === 'features' && (
            <div className="space-y-8">
                <ul className="space-y-4">
                    {proFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center gap-4">
                            <div className="flex-shrink-0 bg-primary/10 text-primary p-2 rounded-full">
                                <feature.icon className="h-5 w-5" />
                            </div>
                            <span className="font-medium">{feature.text}</span>
                        </li>
                    ))}
                </ul>
                <Button size="lg" className="w-full font-semibold" onClick={() => setView('pricing')}>
                    See Pricing <ArrowRight className="ml-2"/>
                </Button>
            </div>
          )}

          {view === 'pricing' && (
             <div className="space-y-6">
                <RadioGroup
                    value={selectedPlan}
                    onValueChange={(value) => setSelectedPlan(value as Plan)}
                    className="grid grid-cols-1 gap-4"
                >
                    {Object.values(plans).map((plan) => (
                        <Label key={plan.id} htmlFor={plan.id} className="cursor-pointer">
                            <Card className={cn(
                                "relative rounded-lg border-2 p-4 transition-all",
                                selectedPlan === plan.id ? "border-primary shadow-lg" : "border-border hover:border-primary/50"
                            )}>
                                {plan.tag && (
                                    <div className="absolute top-0 right-4 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                                        {plan.tag}
                                    </div>
                                )}
                                <CardContent className="p-0 flex items-center justify-between h-full">
                                    <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                                    <div className='text-left'>
                                        <h3 className="text-lg font-semibold font-headline">{plan.name}</h3>
                                        <p className="text-sm text-muted-foreground">{plan.billing}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold">{plan.price}</span>
                                    </div>
                                    {selectedPlan === plan.id && (
                                        <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                                            <Check className="h-4 w-4 text-primary-foreground" />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </Label>
                    ))}
                </RadioGroup>
                 <DialogFooter className="p-0 flex-col space-y-2">
                    <Button size="lg" className="w-full font-semibold" onClick={handleSubscribe}>
                        Buy Now
                    </Button>
                     <p className="text-xs text-center text-muted-foreground">
                        Join thousands of satisfied users who’ve already elevated their game.
                    </p>
                </DialogFooter>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

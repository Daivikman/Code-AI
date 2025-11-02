
import React from 'react';
import { CheckIcon } from './IconComponents';

const PlanFeature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center space-x-3">
        <CheckIcon className="flex-shrink-0 w-5 h-5 text-cyan-400" />
        <span className="text-gray-300">{children}</span>
    </li>
);

const SubscriptionPage: React.FC = () => {
    const plans = [
        {
            name: 'Hobbyist',
            price: 'Free',
            description: 'For individuals and small projects getting started.',
            features: [
                '100 API calls/day',
                'Basic model access',
                'Community support',
                'Limited language support'
            ],
            cta: 'Start for Free'
        },
        {
            name: 'Pro',
            price: '$20',
            description: 'For professional developers and teams.',
            features: [
                'Unlimited API calls',
                'Access to all models',
                'Priority email support',
                'Full language support',
                'Voice assistant features'
            ],
            cta: 'Get Started',
            highlight: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            description: 'For large organizations with specific needs.',
            features: [
                'All Pro features',
                'Dedicated infrastructure',
                '24/7 premium support',
                'On-premise deployment',
                'Custom model training'
            ],
            cta: 'Contact Sales'
        }
    ];

    return (
        <div className="container mx-auto max-w-5xl py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-orbitron font-bold text-cyan-400">Subscription Plans</h1>
                <p className="text-gray-400 mt-2">Choose a plan that fits your coding needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div key={plan.name} className={`flex flex-col p-6 rounded-lg border ${plan.highlight ? 'border-cyan-400 bg-gray-800/50 shadow-2xl shadow-cyan-500/20' : 'border-gray-700 bg-gray-800/20'}`}>
                        <h3 className="text-2xl font-orbitron font-semibold text-white">{plan.name}</h3>
                        <p className="mt-2 text-gray-400 flex-grow">{plan.description}</p>
                        <div className="my-8">
                            <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                            {plan.price !== 'Free' && plan.price !== 'Custom' && <span className="text-gray-400">/month</span>}
                        </div>
                        <ul role="list" className="space-y-4 text-left mb-8">
                            {plan.features.map((feature, index) => (
                                <PlanFeature key={index}>{feature}</PlanFeature>
                            ))}
                        </ul>
                        <a href="#" className={`w-full text-center font-bold py-3 px-4 rounded-md transition-colors duration-300 ${plan.highlight ? 'bg-cyan-500 text-white hover:bg-cyan-400' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}>
                            {plan.cta}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPage;

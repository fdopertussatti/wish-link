'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Crie sua lista',
      description: 'Escolha um nome para sua lista e adicione uma descrição opcional. Você pode criar quantas listas quiser.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Adicione itens',
      description: 'Adicione produtos colando o link da loja ou preenchendo manualmente. Defina prioridades e categorias.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Compartilhe',
      description: 'Gere um link único e compartilhe com amigos e familiares por qualquer canal de comunicação.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )
    },
    {
      number: '04',
      title: 'Sem presentes duplicados',
      description: 'Quando alguém reserva um item, ele fica marcado como reservado para todos, evitando duplicações.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: 'Preciso criar uma conta?',
      answer: 'Não, o WishLink não exige cadastro. Suas listas são armazenadas localmente no seu navegador.'
    },
    {
      question: 'Quanto custa usar o WishLink?',
      answer: 'O WishLink é totalmente gratuito e sem restrições de uso.'
    },
    {
      question: 'Onde meus dados são armazenados?',
      answer: 'Seus dados são armazenados localmente no seu navegador através do localStorage.'
    },
    {
      question: 'Posso acessar minha lista de outro dispositivo?',
      answer: 'Por usar armazenamento local, suas listas ficam disponíveis apenas no dispositivo onde foram criadas. Compartilhe o link para que outros possam visualizar.'
    },
    {
      question: 'É possível editar uma lista depois de criada?',
      answer: 'Sim, você pode adicionar, editar e remover itens a qualquer momento.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/70 to-indigo-900/70"></div>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Como funciona o <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">WishLink</span>
            </h1>
            <p className="text-lg text-purple-100 max-w-xl mx-auto">
              Entenda como criar, gerenciar e compartilhar suas listas de desejos em poucos passos simples.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="card p-6 border-gray-200 hover:border-purple-200 card-hover"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold text-gray-200">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Visualization */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Fluxo completo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como é simples usar o WishLink do início ao fim.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-purple-100 -translate-y-1/2 z-0 hidden md:block"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center z-10 relative">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-purple-100 rounded-full blur opacity-60 z-0"></div>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-900">Criação</h3>
                <p className="text-gray-600">
                  Crie sua lista e adicione os produtos dos seus sonhos com todas as informações.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center z-10 relative">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-indigo-100 rounded-full blur opacity-60 z-0"></div>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-900">Compartilhamento</h3>
                <p className="text-gray-600">
                  Compartilhe o link único com amigos e familiares via WhatsApp, email ou redes sociais.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center z-10 relative">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-green-100 rounded-full blur opacity-60 z-0"></div>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-900">Reservas</h3>
                <p className="text-gray-600">
                  Seus amigos podem reservar itens, que ficam marcados para evitar presentes duplicados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Perguntas Frequentes</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-purple-200 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para criar sua lista?</h2>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-10">
            Comece agora mesmo e organize seus desejos em um só lugar
          </p>
          <Link href="/listas">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
              Criar Minha Lista
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 
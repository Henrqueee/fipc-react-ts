import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { TextInput } from '../../components/UI/Inputs/Inputs';
import { SubmitButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text, Heading } from '../../components/UI/Typography';
import Card from '../../components/Card/Card';
import styles from './Register.module.css';

interface IRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface IToast {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<IToast>({
    message: '',
    type: 'success',
    visible: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      message,
      type,
      visible: true
    });

    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      showToast('Por favor, preencha todos os campos obrigatórios', 'error');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('As senhas não coincidem', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Por favor, insira um email válido', 'error');
      return false;
    }

    if (formData.password.length < 6) {
      showToast('A senha deve ter pelo menos 6 caracteres', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      };
      
      await authService.register(registerData);
      
      showToast('Cadastro realizado com sucesso!', 'success');
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao registrar:', error);
      showToast('Erro ao realizar cadastro. Tente novamente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className={styles.registerPage}>
        <div className={styles.container}>
          {/* Lado esquerdo - Apresentação */}
          <div className={styles.presentationSide}>
            <div className={styles.presentationHeader}>
              <Title className={styles.presentationTitle}>Bem-vindo ao FIPE Query</Title>
              <Text className={styles.presentationSubtitle}>
                Crie sua conta e tenha acesso a todas as funcionalidades da nossa plataforma
              </Text>
            </div>
            
            <div className={styles.cardsContainer}>
              <Card
                icon="🔍"
                title="Consulta Simplificada"
                description="Acesse informações de preços de veículos de forma rápida e precisa"
                animated={true}
                animationDelay={0.1}
              />
              <Card
                icon="⭐"
                title="Favoritos"
                description="Salve suas consultas favoritas para acesso rápido no futuro"
                animated={true}
                animationDelay={0.3}
              />
              <Card
                icon="📊"
                title="Histórico Completo"
                description="Acompanhe todas as suas consultas anteriores em um só lugar"
                animated={true}
                animationDelay={0.5}
              />
            </div>
          </div>
          
          {/* Lado direito - Formulário */}
          <div className={styles.formSide}>
            <div className={styles.formHeader}>
              <Heading level={2} className={styles.formTitle}>Criar Conta</Heading>
              <Text className={styles.formSubtitle}>
                Preencha os campos abaixo para se cadastrar
              </Text>
            </div>
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <TextInput
                  id="firstName"
                  label="Nome"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                />
                <TextInput
                  id="lastName"
                  label="Sobrenome"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Seu sobrenome"
                  required
                />
              </div>
              
              <TextInput
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu.email@exemplo.com"
                required
              />
              
              <TextInput
                id="phone"
                label="Telefone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
              
              <div className={styles.formRow}>
                <TextInput
                  id="password"
                  label="Senha"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Sua senha"
                  required
                />
                <TextInput
                  id="confirmPassword"
                  label="Confirmar Senha"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  required
                />
              </div>
              
              <div className={styles.formActions}>
                <Text>
                  Já tem uma conta?
                </Text>
                <SubmitButton loading={isLoading}>
                  Criar Conta
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
        
        {/* Toast de notificação */}
        {toast.visible && (
          <div className={`${styles.toast} ${toast.type === 'success' ? styles.successToast : styles.errorToast}`}>
            {toast.message}
          </div>
        )}
      </div>
      
      {/* Seção 1: Recursos */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresHeader}>
            <Heading level={2} className={styles.featuresTitle}>Recursos Exclusivos</Heading>
            <Text className={styles.featuresSubtitle}>
              Descubra todas as vantagens que você terá ao se cadastrar em nossa plataforma
            </Text>
          </div>
          
          <div className={styles.featuresGrid}>
            <Card
              icon="📱"
              title="Acesso Mobile"
              description="Consulte informações de veículos em qualquer lugar, a qualquer momento"
            />
            <Card
              icon="🔔"
              title="Alertas de Preço"
              description="Receba notificações quando o preço de um veículo favorito mudar"
            />
            <Card
              icon="📊"
              title="Análise de Mercado"
              description="Visualize gráficos e tendências de preços ao longo do tempo"
            />
          </div>
        </div>
      </section>
      
      {/* Seção 2: Depoimentos */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <div className={styles.testimonialsHeader}>
            <Heading level={2} className={styles.testimonialsTitle}>O que nossos usuários dizem</Heading>
            <Text className={styles.testimonialsSubtitle}>
              Veja como nossa plataforma tem ajudado pessoas a tomar decisões melhores
            </Text>
          </div>
          
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Text className={styles.testimonialText}>
                  "A plataforma FIPE Query me ajudou a economizar tempo e dinheiro na compra do meu novo carro. Recomendo a todos!"
                </Text>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>MR</div>
                <div>
                  <Text className={styles.testimonialName}>Marcos Ribeiro</Text>
                  <Text className={styles.testimonialRole}>Cliente desde 2022</Text>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Text className={styles.testimonialText}>
                  "Como revendedor de veículos, esta ferramenta se tornou essencial para o meu negócio. Dados precisos e atualizados."
                </Text>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>CS</div>
                <div>
                  <Text className={styles.testimonialName}>Carolina Silva</Text>
                  <Text className={styles.testimonialRole}>Revendedora</Text>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Text className={styles.testimonialText}>
                  "Interface intuitiva e dados confiáveis. Consegui negociar melhor o valor do meu carro usado graças às informações."
                </Text>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>JP</div>
                <div>
                  <Text className={styles.testimonialName}>João Paulo</Text>
                  <Text className={styles.testimonialRole}>Usuário Premium</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção 3: FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <Heading level={2} className={styles.faqTitle}>Perguntas Frequentes</Heading>
            <Text className={styles.faqSubtitle}>
              Encontre respostas para as dúvidas mais comuns sobre nossa plataforma
            </Text>
          </div>
          
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <Heading level={3} className={styles.faqItemTitle}>Como os preços são calculados?</Heading>
              <Text className={styles.faqItemText}>
                Nossos preços são baseados na <span className={styles.specialLink}>tabela FIPE oficial</span>, atualizada regularmente para garantir a precisão das informações.
              </Text>
            </div>
            
            <div className={styles.faqItem}>
              <Heading level={3} className={styles.faqItemTitle}>Posso acessar o histórico de preços?</Heading>
              <Text className={styles.faqItemText}>
                Sim, <span className={styles.specialLink}>usuários cadastrados</span> podem acessar o histórico de preços dos últimos 12 meses para qualquer veículo.
              </Text>
            </div>
            
            <div className={styles.faqItem}>
              <Heading level={3} className={styles.faqItemTitle}>Como salvar veículos favoritos?</Heading>
              <Text className={styles.faqItemText}>
                Após realizar uma consulta, basta clicar no <span className={styles.highlightLink}>ícone de estrela</span> para adicionar o veículo aos seus favoritos.
              </Text>
            </div>
            
            <div className={styles.faqItem}>
              <Heading level={3} className={styles.faqItemTitle}>Os dados são atualizados com que frequência?</Heading>
              <Text className={styles.faqItemText}>
                Nossa base de dados é atualizada mensalmente, seguindo o calendário oficial de atualizações da tabela FIPE.
              </Text>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
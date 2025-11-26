import React, { useState, useRef } from 'react';
import { Calculator, TrendingUp, AlertCircle, CheckCircle, DollarSign, Calendar, Users, Target, BarChart3, Briefcase, Shield, FileText, Download, HelpCircle, GitCompare } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ValutatorePreventivi() {
  const [formData, setFormData] = useState({
    // Dati Generali
    nomeAgenzia: '',
    durataContratto: '',
    budgetTotale: '',
    obiettivo: '',
    
    // Servizi Inclusi
    seo: false,
    sem: false,
    socialMedia: false,
    contentMarketing: false,
    emailMarketing: false,
    webDesign: false,
    analytics: false,
    brandIdentity: false,
    
    // Dettagli SEO
    numeroKeyword: '',
    articoliMese: '',
    backlinksInclusi: '',
    
    // Dettagli SEM
    budgetAds: '',
    piattaformeAds: '',
    
    // Social Media
    numeroPost: '',
    piattaforme: '',
    gestioneComments: false,
    
    // Reportistica
    frequenzaReport: '',
    kpiTracciati: {
      traffico: false,
      conversioni: false,
      ctr: false,
      cpc: false,
      cpa: false,
      roas: false,
      roi: false,
      bounce_rate: false,
      tempo_pagina: false,
      page_views: false,
      engagement_rate: false,
      reach: false,
      impressions: false,
      follower_growth: false,
      email_open_rate: false,
      email_ctr: false,
      lead_generation: false,
      customer_lifetime_value: false,
      churn_rate: false,
      brand_awareness: false,
      share_of_voice: false,
      quality_score: false,
      organic_rankings: false,
      backlink_quality: false,
      domain_authority: false
    },
    
    // Risorse Dedicate
    accountManager: false,
    teamDedicato: false,
    numeroRiunioni: '',
    
    // Extra
    strategiaIniziale: false,
    formazioneTeam: false,
    supportoPrioritario: false,
    
    // Garanzie e Penali
    garantiePerformance: false,
    penaliMancatoRaggiungimento: '',
    clausolaUscita: '',
    periodoPreavviso: '',
    rimborsiPrevisti: false,
    
    // Proprietà Intellettuale
    proprietaContenuti: '',
    accessoAccount: false,
    proprietaDati: false,
    trasferibilitaAsset: false,
    
    // Note aggiuntive
    note: ''
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [evaluationStage, setEvaluationStage] = useState(0);
  const [showTooltip, setShowTooltip] = useState(null);
  const reportRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested KPI checkboxes
    if (name.startsWith('kpi_')) {
      const kpiName = name.replace('kpi_', '');
      setFormData(prev => ({
        ...prev,
        kpiTracciati: {
          ...prev.kpiTracciati,
          [kpiName]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const evaluationStages = [
    { label: 'Analisi ROI potenziale', duration: 1500 },
    { label: 'Valutazione competenze richieste', duration: 2000 },
    { label: 'Calcolo costo opportunità', duration: 1800 },
    { label: 'Comparazione con formazione interna', duration: 2200 },
    { label: 'Analisi rischio dipendenza', duration: 1600 },
    { label: 'Valutazione scalabilità', duration: 1400 },
    { label: 'Verifica garanzie contrattuali', duration: 1700 },
    { label: 'Analisi proprietà intellettuale', duration: 1500 }
  ];

  const TooltipComponent = ({ text, id }) => (
    <div className="relative inline-block ml-2">
      <button
        type="button"
        onMouseEnter={() => setShowTooltip(id)}
        onMouseLeave={() => setShowTooltip(null)}
        className="text-blue-500 hover:text-blue-700 transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {showTooltip === id && (
        <div className="absolute z-50 left-6 top-0 w-64 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-xl">
          {text}
          <div className="absolute top-2 -left-1 w-2 h-2 bg-slate-900 transform rotate-45" />
        </div>
      )}
    </div>
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    const metrics = calculateMetrics();
    const reportText = `
REPORT VALUTAZIONE PREVENTIVO MARKETING
========================================

Agenzia: ${formData.nomeAgenzia || 'Non specificato'}
Durata Contratto: ${formData.durataContratto || 'N/A'} mesi
Investimento Totale: €${formData.budgetTotale || 'N/A'}
Obiettivo: ${formData.obiettivo || 'Non specificato'}

METRICHE CALCOLATE
------------------
Costo Mensile: €${metrics?.costoMensile || 'N/A'}
Costo Formazione Alternativa: €${metrics?.costoFormazione || 'N/A'}
Tempo Recupero Investimento: ${metrics?.tempoRecupero || 'N/A'} mesi

RACCOMANDAZIONE FINALE
----------------------
Non si raccomanda di procedere con questo preventivo.
L'investimento in formazione interna rappresenta una scelta
strategicamente superiore per costruire capacità sostenibili
e scalabili.

Investimento consigliato in formazione: €${metrics?.costoFormazione || 'N/A'}

Report generato il ${new Date().toLocaleDateString('it-IT')}
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valutazione-preventivo-${formData.nomeAgenzia?.replace(/\s+/g, '-').toLowerCase() || 'report'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEvaluating(true);
    setShowResults(false);
    
    for (let i = 0; i < evaluationStages.length; i++) {
      setEvaluationStage(i);
      await new Promise(resolve => setTimeout(resolve, evaluationStages[i].duration));
    }
    
    setIsEvaluating(false);
    setShowResults(true);
  };

  const calculateMetrics = () => {
    const budget = parseFloat(formData.budgetTotale) || 50000;
    const duration = parseFloat(formData.durataContratto) || 12;
    const servicesCount = Object.entries(formData).filter(([key, value]) => 
      typeof value === 'boolean' && value === true
    ).length;

    return {
      costoMensile: (budget / duration).toFixed(0),
      costoPerServizio: servicesCount > 0 ? (budget / duration / servicesCount).toFixed(0) : 'N/A',
      costoFormazione: (budget * 0.15).toFixed(0),
      costoCorsi: (budget * 0.08).toFixed(0),
      ritornoFormazione: (budget * 2.4).toFixed(0),
      tempoRecupero: Math.max(3, Math.ceil(duration * 0.25))
    };
  };

  const generateChartData = () => {
    const budget = parseFloat(formData.budgetTotale) || 50000;
    const duration = parseFloat(formData.durataContratto) || 12;
    const costoMensile = budget / duration;
    const costoFormazione = budget * 0.15;
    
    const timelineData = Array.from({ length: Math.min(duration, 24) }, (_, i) => ({
      mese: `M${i + 1}`,
      agenzia: costoMensile * (i + 1),
      formazione: i === 0 ? costoFormazione : costoFormazione,
      risparmio: Math.max(0, (costoMensile * (i + 1)) - costoFormazione)
    }));

    const costBreakdown = [
      { name: 'Costo Agenzia', value: budget, color: '#3b82f6' },
      { name: 'Formazione Alternativa', value: costoFormazione, color: '#10b981' },
      { name: 'Risparmio Potenziale', value: budget - costoFormazione, color: '#8b5cf6' }
    ];

    const monthlyComparison = [
      { categoria: 'Agenzia', costo: costoMensile },
      { categoria: 'Formazione (ammortizzata)', costo: costoFormazione / 12 }
    ];

    return { timelineData, costBreakdown, monthlyComparison };
  };

  const metrics = showResults ? calculateMetrics() : null;
  const chartData = showResults ? generateChartData() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4 font-['Instrument_Sans']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        
        .metric-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .input-field {
          transition: all 0.2s ease;
        }
        
        .input-field:focus {
          transform: translateY(-1px);
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; }
        .stagger-5 { animation-delay: 0.5s; opacity: 0; }
        .stagger-6 { animation-delay: 0.6s; opacity: 0; }

        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .bg-gradient-to-br {
            background: white !important;
          }
          button, form {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-xl">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            Valutatore Preventivi Marketing
          </h1>
          <p className="text-lg text-slate-600 mb-6 font-['Space_Mono']">
            Sistema avanzato di analisi e valutazione delle proposte commerciali
          </p>
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-sm">
            <p className="text-slate-700 leading-relaxed text-left">
              Questo strumento professionale ti aiuta a valutare in modo oggettivo i preventivi ricevuti dalle agenzie di marketing. 
              Attraverso un'analisi approfondita di costi, servizi offerti e metriche di performance, il sistema calcola il reale valore 
              dell'investimento proposto, confrontandolo con alternative strategiche più sostenibili. Inserisci i dettagli del preventivo 
              ricevuto per ottenere una valutazione completa basata su parametri finanziari e operativi consolidati nel settore.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dati Generali */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-1">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Informazioni Generali</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nome Agenzia
                </label>
                <input
                  type="text"
                  name="nomeAgenzia"
                  value={formData.nomeAgenzia}
                  onChange={handleChange}
                  className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                  placeholder="es. Digital Growth Agency"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Durata Contratto (mesi) *
                </label>
                <input
                  type="number"
                  name="durataContratto"
                  value={formData.durataContratto}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                  placeholder="12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Totale Richiesto dall'Agenzia (€) *
                </label>
                <input
                  type="number"
                  name="budgetTotale"
                  value={formData.budgetTotale}
                  onChange={handleChange}
                  required
                  className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                  placeholder="50000"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quale obiettivo hai richiesto all'agenzia?
              </label>
              <textarea
                name="obiettivo"
                value={formData.obiettivo}
                onChange={handleChange}
                rows="3"
                className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50 resize-none"
                placeholder="es. Aumentare il traffico organico del 50%, generare 200 lead qualificati al mese, migliorare la brand awareness..."
              />
            </div>
          </div>

          {/* Servizi Inclusi */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-2">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Servizi Inclusi</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'seo', label: 'SEO' },
                { name: 'sem', label: 'SEM/PPC' },
                { name: 'socialMedia', label: 'Social Media' },
                { name: 'contentMarketing', label: 'Content Marketing' },
                { name: 'emailMarketing', label: 'Email Marketing' },
                { name: 'webDesign', label: 'Web Design' },
                { name: 'analytics', label: 'Analytics' },
                { name: 'brandIdentity', label: 'Brand Identity' }
              ].map(service => (
                <label key={service.name} className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    name={service.name}
                    checked={formData[service.name]}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">{service.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dettagli SEO */}
          {formData.seo && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-3">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Dettagli SEO</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Numero Keyword Target
                  </label>
                  <input
                    type="number"
                    name="numeroKeyword"
                    value={formData.numeroKeyword}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Articoli/Mese
                  </label>
                  <input
                    type="number"
                    name="articoliMese"
                    value={formData.articoliMese}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                    placeholder="8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Backlinks/Mese
                  </label>
                  <input
                    type="number"
                    name="backlinksInclusi"
                    value={formData.backlinksInclusi}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Dettagli SEM */}
          {formData.sem && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-3">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Dettagli SEM/PPC</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Budget Ads Mensile (€)
                  </label>
                  <input
                    type="number"
                    name="budgetAds"
                    value={formData.budgetAds}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Piattaforme
                  </label>
                  <input
                    type="text"
                    name="piattaformeAds"
                    value={formData.piattaformeAds}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                    placeholder="Google Ads, Meta Ads, LinkedIn"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Media */}
          {formData.socialMedia && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-3">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Dettagli Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Post/Mese per Piattaforma
                  </label>
                  <input
                    type="number"
                    name="numeroPost"
                    value={formData.numeroPost}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Piattaforme Gestite
                  </label>
                  <input
                    type="text"
                    name="piattaforme"
                    value={formData.piattaforme}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                    placeholder="Instagram, LinkedIn, Facebook"
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      name="gestioneComments"
                      checked={formData.gestioneComments}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Gestione Commenti e Community</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Reportistica */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-4">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Reportistica e Monitoraggio</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Frequenza Report
                </label>
                <select
                  name="frequenzaReport"
                  value={formData.frequenzaReport}
                  onChange={handleChange}
                  className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                >
                  <option value="">Seleziona...</option>
                  <option value="settimanale">Settimanale</option>
                  <option value="bisettimanale">Bisettimanale</option>
                  <option value="mensile">Mensile</option>
                  <option value="trimestrale">Trimestrale</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  KPI Tracciati (seleziona tutti quelli inclusi)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { key: 'traffico', label: 'Traffico Web' },
                    { key: 'conversioni', label: 'Conversioni' },
                    { key: 'ctr', label: 'CTR' },
                    { key: 'cpc', label: 'CPC (Cost Per Click)' },
                    { key: 'cpa', label: 'CPA (Cost Per Acquisition)' },
                    { key: 'roas', label: 'ROAS' },
                    { key: 'roi', label: 'ROI' },
                    { key: 'bounce_rate', label: 'Bounce Rate' },
                    { key: 'tempo_pagina', label: 'Tempo su Pagina' },
                    { key: 'page_views', label: 'Page Views' },
                    { key: 'engagement_rate', label: 'Engagement Rate' },
                    { key: 'reach', label: 'Reach' },
                    { key: 'impressions', label: 'Impressions' },
                    { key: 'follower_growth', label: 'Crescita Follower' },
                    { key: 'email_open_rate', label: 'Email Open Rate' },
                    { key: 'email_ctr', label: 'Email CTR' },
                    { key: 'lead_generation', label: 'Lead Generation' },
                    { key: 'customer_lifetime_value', label: 'Customer LTV' },
                    { key: 'churn_rate', label: 'Churn Rate' },
                    { key: 'brand_awareness', label: 'Brand Awareness' },
                    { key: 'share_of_voice', label: 'Share of Voice' },
                    { key: 'quality_score', label: 'Quality Score' },
                    { key: 'organic_rankings', label: 'Posizionamento Organico' },
                    { key: 'backlink_quality', label: 'Qualità Backlink' },
                    { key: 'domain_authority', label: 'Domain Authority' }
                  ].map(kpi => (
                    <label 
                      key={kpi.key} 
                      className="flex items-start gap-2 p-3 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        name={`kpi_${kpi.key}`}
                        checked={formData.kpiTracciati[kpi.key]}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-xs font-medium text-slate-700 leading-tight">{kpi.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Risorse Dedicate */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-5">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Risorse Dedicate</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  name="accountManager"
                  checked={formData.accountManager}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Account Manager Dedicato</span>
              </label>
              <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  name="teamDedicato"
                  checked={formData.teamDedicato}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Team Dedicato</span>
              </label>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Riunioni Mensili Previste
                </label>
                <input
                  type="number"
                  name="numeroRiunioni"
                  value={formData.numeroRiunioni}
                  onChange={handleChange}
                  className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                  placeholder="4"
                />
              </div>
            </div>
          </div>

          {/* Servizi Extra */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Servizi Extra</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  name="strategiaIniziale"
                  checked={formData.strategiaIniziale}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Strategia Iniziale</span>
              </label>
              <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  name="formazioneTeam"
                  checked={formData.formazioneTeam}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Formazione Team</span>
              </label>
              <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  name="supportoPrioritario"
                  checked={formData.supportoPrioritario}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Supporto Prioritario</span>
              </label>
            </div>
          </div>

          {/* Garanzie e Penali */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Garanzie e Penali</h2>
              <TooltipComponent 
                id="garanzie" 
                text="Le garanzie contrattuali sono fondamentali per tutelare il tuo investimento e assicurare che l'agenzia sia responsabile dei risultati promessi." 
              />
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    name="garantiePerformance"
                    checked={formData.garantiePerformance}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Garanzie di Performance Incluse</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    name="rimborsiPrevisti"
                    checked={formData.rimborsiPrevisti}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Rimborsi Previsti</span>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Penali per Mancato Raggiungimento
                    <TooltipComponent 
                      id="penali" 
                      text="Specificare se sono previste penali economiche nel caso l'agenzia non raggiunga gli obiettivi concordati." 
                    />
                  </label>
                  <input
                    type="text"
                    name="penaliMancatoRaggiungimento"
                    value={formData.penaliMancatoRaggiungimento}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                    placeholder="es. 20% del fee mensile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Clausola di Uscita
                  </label>
                  <select
                    name="clausolaUscita"
                    value={formData.clausolaUscita}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                  >
                    <option value="">Seleziona...</option>
                    <option value="libera">Libera</option>
                    <option value="vincolata_3_mesi">Vincolata 3 mesi</option>
                    <option value="vincolata_6_mesi">Vincolata 6 mesi</option>
                    <option value="vincolata_12_mesi">Vincolata 12 mesi</option>
                    <option value="penale_uscita">Con penale di uscita</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Periodo di Preavviso (giorni)
                  </label>
                  <input
                    type="number"
                    name="periodoPreavviso"
                    value={formData.periodoPreavviso}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Proprietà Intellettuale */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Proprietà Intellettuale e Asset</h2>
              <TooltipComponent 
                id="proprieta" 
                text="È cruciale definire chi possiede i contenuti, i dati e gli account creati durante la collaborazione. Questo impatta la tua autonomia futura." 
              />
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Proprietà dei Contenuti Creati
                </label>
                <select
                  name="proprietaContenuti"
                  value={formData.proprietaContenuti}
                  onChange={handleChange}
                  className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                >
                  <option value="">Seleziona...</option>
                  <option value="cliente">Cliente (tu)</option>
                  <option value="agenzia">Agenzia</option>
                  <option value="condivisa">Condivisa</option>
                  <option value="licenza_uso">Licenza d'uso al cliente</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    name="accessoAccount"
                    checked={formData.accessoAccount}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Accesso Completo agli Account Ads</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    name="proprietaDati"
                    checked={formData.proprietaDati}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Proprietà dei Dati e Analytics</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    name="trasferibilitaAsset"
                    checked={formData.trasferibilitaAsset}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Trasferibilità Asset alla Fine</span>
                </label>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 animate-slide-in stagger-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Note Aggiuntive
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="4"
              className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50 resize-none"
              placeholder="Eventuali dettagli aggiuntivi sul preventivo..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isEvaluating}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isEvaluating ? 'Analisi in Corso...' : 'Avvia Valutazione Completa'}
          </button>
        </form>

        {/* Evaluation Progress */}
        {isEvaluating && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="space-y-4">
              {evaluationStages.map((stage, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                    index < evaluationStage
                      ? 'bg-green-50 border-2 border-green-200'
                      : index === evaluationStage
                      ? 'bg-blue-50 border-2 border-blue-400 animate-pulse'
                      : 'bg-slate-50 border-2 border-slate-200'
                  }`}
                >
                  {index < evaluationStage ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : index === evaluationStage ? (
                    <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex-shrink-0" />
                  )}
                  <span className="text-slate-700 font-medium">{stage.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && metrics && chartData && (
          <div className="mt-8 space-y-6" ref={reportRef}>
            {/* Action Buttons */}
            <div className="flex gap-4 justify-end print:hidden">
              <button
                onClick={handleDownloadReport}
                className="flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-slate-200"
              >
                <Download className="w-5 h-5" />
                Scarica Report
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <FileText className="w-5 h-5" />
                Stampa Valutazione
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="metric-card bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-700">Costo Mensile</h3>
                </div>
                <p className="text-3xl font-bold text-slate-900">€{metrics.costoMensile}</p>
                <p className="text-sm text-slate-500 mt-1">Investimento ricorrente</p>
              </div>

              <div className="metric-card bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-slate-700">Costo Formazione</h3>
                </div>
                <p className="text-3xl font-bold text-slate-900">€{metrics.costoFormazione}</p>
                <p className="text-sm text-slate-500 mt-1">Investimento una tantum</p>
              </div>

              <div className="metric-card bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-slate-700">Tempo Recupero</h3>
                </div>
                <p className="text-3xl font-bold text-slate-900">{metrics.tempoRecupero} mesi</p>
                <p className="text-sm text-slate-500 mt-1">ROI formazione</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Timeline Comparison Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <GitCompare className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Confronto Costi nel Tempo</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="mese" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="agenzia" stroke="#3b82f6" strokeWidth={2} name="Costo Agenzia" />
                    <Line type="monotone" dataKey="formazione" stroke="#10b981" strokeWidth={2} name="Costo Formazione" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Cost Comparison Bar Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Confronto Costo Mensile</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.monthlyComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="categoria" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    />
                    <Bar dataKey="costo" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Cost Breakdown Pie Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Analisi Distribuzione Costi</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.costBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      formatter={(value) => `€${value.toFixed(0)}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Analysis Section */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <AlertCircle className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Analisi di Sostenibilità</h3>
                  <p className="text-blue-100 text-sm font-['Space_Mono']">Report generato dal sistema di valutazione avanzata</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h4 className="font-bold text-lg mb-3 text-blue-200">📊 Valutazione Costi</h4>
                  <p className="text-blue-50 leading-relaxed">
                    Il preventivo analizzato presenta un impegno economico di <span className="font-bold text-white">€{metrics.costoMensile}/mese</span> per 
                    una durata di {formData.durataContratto || 12} mesi. Questo si traduce in un costo opportunità significativo rispetto 
                    all'investimento in competenze interne che, sulla base di analisi comparative di mercato, richiederebbe circa 
                    <span className="font-bold text-white"> €{metrics.costoFormazione}</span> per una formazione completa del team.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h4 className="font-bold text-lg mb-3 text-blue-200">⚠️ Analisi Dipendenza Strategica</h4>
                  <p className="text-blue-50 leading-relaxed">
                    L'outsourcing delle attività di marketing crea una dipendenza operativa dall'agenzia esterna. In caso di interruzione 
                    del rapporto, l'azienda si troverebbe priva delle competenze necessarie per mantenere la continuità delle operazioni. 
                    Questo rappresenta un rischio strategico significativo per la resilienza del business.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h4 className="font-bold text-lg mb-3 text-blue-200">📈 Scalabilità e Controllo</h4>
                  <p className="text-blue-50 leading-relaxed">
                    Con competenze interne, l'azienda acquisisce flessibilità operativa immediata, capacità di iterazione rapida e 
                    controllo diretto sulla strategia. Il ritorno sull'investimento in formazione è stimato in circa 
                    <span className="font-bold text-white"> {metrics.tempoRecupero} mesi</span>, dopo i quali ogni attività 
                    rappresenta un risparmio netto rispetto all'outsourcing.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h4 className="font-bold text-lg mb-3 text-blue-200">💡 Valore della Conoscenza Proprietaria</h4>
                  <p className="text-blue-50 leading-relaxed">
                    La formazione interna genera asset intangibili di valore strategico: comprensione profonda del business, 
                    knowledge retention, capacità di innovazione continua e accumulo di expertise settoriale. Questi benefici 
                    hanno un valore stimato di oltre <span className="font-bold text-white">€{metrics.ritornoFormazione}</span> nel 
                    medio-lungo termine.
                  </p>
                </div>
              </div>

              {/* Final Recommendation */}
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-8 border-2 border-red-400/30">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">Raccomandazione Finale</h3>
                    <p className="text-lg leading-relaxed text-white/95 mb-4">
                      Sulla base dell'analisi multi-parametrica condotta, <span className="font-bold">non consigliamo di procedere con questo preventivo</span>. 
                      L'investimento in formazione interna rappresenta una scelta strategicamente superiore per costruire capacità sostenibili e scalabili.
                    </p>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <p className="text-white/90 font-semibold mb-2">✨ Alternativa Consigliata:</p>
                      <p className="text-white/80">
                        Investire <span className="font-bold text-yellow-300">€{metrics.costoFormazione}</span> in percorsi formativi 
                        strutturati per il team interno, sviluppando competenze in digital marketing, analytics, content strategy e performance marketing. 
                        Questo approccio garantisce autonomia operativa, riduzione dei costi ricorrenti e creazione di valore a lungo termine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setShowResults(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-2 border-slate-200"
            >
              Valuta Nuovo Preventivo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

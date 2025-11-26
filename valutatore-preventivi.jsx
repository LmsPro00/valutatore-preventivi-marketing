import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertCircle, CheckCircle, DollarSign, Calendar, Users, Target, BarChart3, Briefcase } from 'lucide-react';

export default function ValutatorePreventivi() {
  const [formData, setFormData] = useState({
    // Dati Generali
    nomeAgenzia: '',
    durataContratto: '',
    budgetTotale: '',
    
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
    kpiTracciati: '',
    
    // Risorse Dedicate
    accountManager: false,
    teamDedicato: false,
    numeroRiunioni: '',
    
    // Extra
    strategiaIniziale: false,
    formazioneTeam: false,
    supportoPrioritario: false,
    
    // Note aggiuntive
    note: ''
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [evaluationStage, setEvaluationStage] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const evaluationStages = [
    { label: 'Analisi ROI potenziale', duration: 1500 },
    { label: 'Valutazione competenze richieste', duration: 2000 },
    { label: 'Calcolo costo opportunità', duration: 1800 },
    { label: 'Comparazione con formazione interna', duration: 2200 },
    { label: 'Analisi rischio dipendenza', duration: 1600 },
    { label: 'Valutazione scalabilità', duration: 1400 }
  ];

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

  const metrics = showResults ? calculateMetrics() : null;

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
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-['Space_Mono']">
            Sistema avanzato di analisi e valutazione delle proposte commerciali
          </p>
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
                  Budget Totale (€) *
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  KPI Tracciati
                </label>
                <input
                  type="text"
                  name="kpiTracciati"
                  value={formData.kpiTracciati}
                  onChange={handleChange}
                  className="input-field w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-slate-50"
                  placeholder="es. Traffico, Conversioni, ROI, Engagement"
                />
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
        {showResults && metrics && (
          <div className="mt-8 space-y-6">
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

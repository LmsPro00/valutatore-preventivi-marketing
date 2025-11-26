import React from 'react';
import { AlertCircle, CheckCircle, XCircle, TrendingUp, Shield, Users, Target, BarChart3, ArrowLeft, FileText, Download } from 'lucide-react';

export default function RisultatiValutazione({ data, onBack }) {
  // Analizza i dati per identificare le criticità
  const analizzaCriticita = () => {
    const criticita = [];
    
    // Analisi Garanzie e Penali
    if (!data.garantiePerformance) {
      criticita.push({
        categoria: 'Garanzie',
        titolo: 'Assenza di Garanzie di Performance',
        descrizione: 'L\'agenzia non offre garanzie sui risultati. Questo significa che pagherai indipendentemente dai risultati ottenuti, trasferendo tutto il rischio sulla tua azienda.',
        gravita: 'alta',
        icon: Shield
      });
    }
    
    if (!data.rimborsiPrevisti) {
      criticita.push({
        categoria: 'Garanzie',
        titolo: 'Nessun Rimborso Previsto',
        descrizione: 'In caso di mancato raggiungimento degli obiettivi, non sono previsti rimborsi. Il tuo investimento è completamente a rischio.',
        gravita: 'alta',
        icon: Shield
      });
    }
    
    // Analisi Proprietà Intellettuale
    if (data.proprietaContenuti !== 'cliente') {
      criticita.push({
        categoria: 'Proprietà Intellettuale',
        titolo: 'Contenuti Non di Tua Proprietà',
        descrizione: 'I contenuti creati potrebbero non essere di tua proprietà. Se interrompi il rapporto, potresti perdere tutto il materiale prodotto.',
        gravita: 'alta',
        icon: FileText
      });
    }
    
    if (!data.accessoAccount) {
      criticita.push({
        categoria: 'Proprietà Intellettuale',
        titolo: 'Accesso Limitato agli Account',
        descrizione: 'Non avrai accesso completo agli account pubblicitari e analytics. Questo crea dipendenza totale dall\'agenzia per qualsiasi modifica o analisi.',
        gravita: 'alta',
        icon: Target
      });
    }
    
    if (!data.proprietaDati) {
      criticita.push({
        categoria: 'Proprietà Intellettuale',
        titolo: 'Dati Non di Tua Proprietà',
        descrizione: 'I dati raccolti potrebbero non essere trasferibili. Perderai anni di insights e conoscenza del tuo pubblico se cambi agenzia.',
        gravita: 'alta',
        icon: BarChart3
      });
    }
    
    // Analisi Clausole di Uscita
    const periodoPreavviso = parseInt(data.periodoPreavviso) || 0;
    if (periodoPreavviso > 60) {
      criticita.push({
        categoria: 'Clausole Contrattuali',
        titolo: 'Periodo di Preavviso Eccessivo',
        descrizione: `Richiesto un preavviso di ${periodoPreavviso} giorni. Questo ti vincola all'agenzia anche se non sei soddisfatto dei risultati.`,
        gravita: 'media',
        icon: AlertCircle
      });
    }
    
    if (data.clausolaUscita === 'penale' || data.clausolaUscita === 'difficile') {
      criticita.push({
        categoria: 'Clausole Contrattuali',
        titolo: 'Clausola di Uscita Penalizzante',
        descrizione: 'Uscire dal contratto comporta penali o è molto difficile. Sei intrappolato in un rapporto che potrebbe non funzionare.',
        gravita: 'alta',
        icon: AlertCircle
      });
    }
    
    // Analisi Risorse Dedicate
    if (!data.accountManager) {
      criticita.push({
        categoria: 'Risorse',
        titolo: 'Nessun Account Manager Dedicato',
        descrizione: 'Non avrai un referente dedicato. Il tuo progetto sarà gestito da persone diverse, perdendo continuità e comprensione del business.',
        gravita: 'media',
        icon: Users
      });
    }
    
    const numeroRiunioni = parseInt(data.numeroRiunioni) || 0;
    if (numeroRiunioni < 2) {
      criticita.push({
        categoria: 'Risorse',
        titolo: 'Scarso Coinvolgimento',
        descrizione: `Solo ${numeroRiunioni} riunioni al mese. L'agenzia dedicherà poco tempo al tuo progetto, trattandolo come uno dei tanti.`,
        gravita: 'media',
        icon: Users
      });
    }
    
    // Analisi Reportistica
    if (data.frequenzaReport === 'trimestrale' || data.frequenzaReport === 'mensile') {
      criticita.push({
        categoria: 'Monitoraggio',
        titolo: 'Reportistica Insufficiente',
        descrizione: 'Report troppo radi non permettono di intervenire tempestivamente. Scoprirai i problemi quando è troppo tardi.',
        gravita: 'media',
        icon: BarChart3
      });
    }
    
    const kpiCount = Object.values(data.kpiTracciati || {}).filter(Boolean).length;
    if (kpiCount < 5) {
      criticita.push({
        categoria: 'Monitoraggio',
        titolo: 'KPI Limitati',
        descrizione: `Solo ${kpiCount} KPI tracciati. Una visione parziale non permette di comprendere realmente l'efficacia delle campagne.`,
        gravita: 'media',
        icon: BarChart3
      });
    }
    
    // Analisi Commissioni
    const commissioneBudget = parseFloat(data.commissioneBudgetAds) || 0;
    const commissioneRoas = parseFloat(data.commissioneRoas) || 0;
    
    if (commissioneBudget > 10) {
      criticita.push({
        categoria: 'Costi',
        titolo: 'Commissione Elevata su Budget Pubblicitario',
        descrizione: `L'agenzia applica una commissione del ${commissioneBudget}% sul budget pubblicitario. Questo significa che una parte significativa del tuo investimento va all'agenzia invece che alle campagne.`,
        gravita: 'alta',
        icon: DollarSign
      });
    }
    
    if (commissioneRoas > 5) {
      criticita.push({
        categoria: 'Costi',
        titolo: 'Commissione su ROAS',
        descrizione: `Commissione del ${commissioneRoas}% sul ritorno pubblicitario. Più guadagni, più paghi: un modello che può disincentivare l'ottimizzazione dei costi.`,
        gravita: 'media',
        icon: TrendingUp
      });
    }
    
    return criticita;
  };
  
  const criticita = analizzaCriticita();
  const criticitaAlte = criticita.filter(c => c.gravita === 'alta').length;
  const criticitaMedie = criticita.filter(c => c.gravita === 'media').length;
  
  const budget = parseFloat(data.budgetTotale) || 0;
  const durataContratto = parseFloat(data.durataContratto) || 12;
  const costoMensile = budget / durataContratto;
  
  const handleDownloadReport = () => {
    const reportText = `
REPORT VALUTAZIONE PREVENTIVO MARKETING
========================================

Agenzia: ${data.nomeAgenzia || 'Non specificato'}
Durata Contratto: ${durataContratto} mesi
Investimento Totale: €${budget.toLocaleString('it-IT')}
Investimento Mensile: €${costoMensile.toFixed(0).toLocaleString('it-IT')}

ANALISI CRITICITÀ
-----------------
Criticità Alte: ${criticitaAlte}
Criticità Medie: ${criticitaMedie}

DETTAGLIO CRITICITÀ:
${criticita.map((c, i) => `
${i + 1}. [${c.gravita.toUpperCase()}] ${c.titolo}
   ${c.descrizione}
`).join('\n')}

RACCOMANDAZIONE FINALE
----------------------
Sulla base dell'analisi condotta, NON consigliamo di procedere con questo preventivo.

Le criticità emerse evidenziano una struttura contrattuale che:
- Trasferisce tutti i rischi sulla tua azienda
- Crea dipendenza dall'agenzia
- Limita la tua autonomia operativa
- Non garantisce risultati misurabili

ALTERNATIVA CONSIGLIATA
-----------------------
Investire nella formazione del team interno per:
✓ Acquisire pieno controllo delle strategie
✓ Costruire competenze proprietarie
✓ Eliminare la dipendenza da fornitori esterni
✓ Dedicare risorse strategiche alla crescita
✓ Mantenere la proprietà di dati e contenuti

Report generato il ${new Date().toLocaleDateString('it-IT')}
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valutazione-${data.nomeAgenzia?.replace(/\s+/g, '-').toLowerCase() || 'preventivo'}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4 font-['Inter']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        
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
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in">
          <div className="inline-flex items-center justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 font-['Cormorant_Garamond'] text-[#132E55]">
            Risultati Valutazione
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Analisi completa del preventivo di {data.nomeAgenzia || 'agenzia marketing'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between mb-8 animate-slide-in stagger-1">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-slate-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Torna al Form
          </button>
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 bg-gradient-to-r from-[#132E55] to-[#A38C54] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Scarica Report
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 mb-8 animate-slide-in stagger-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{criticitaAlte}</div>
              <div className="text-sm text-slate-600">Criticità Alte</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{criticitaMedie}</div>
              <div className="text-sm text-slate-600">Criticità Medie</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">€{costoMensile.toFixed(0)}</div>
              <div className="text-sm text-slate-600">Costo Mensile</div>
            </div>
          </div>
        </div>

        {/* Criticità Emerse */}
        <div className="space-y-6 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 animate-slide-in stagger-3">Criticità Emerse dall'Analisi</h2>
          
          {criticita.length === 0 ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 animate-slide-in stagger-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">Nessuna Criticità Rilevata</h3>
                  <p className="text-green-700">
                    Il preventivo presenta condizioni contrattuali equilibrate. Tuttavia, considera sempre i vantaggi di sviluppare competenze interne.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            criticita.map((crit, index) => (
              <div
                key={index}
                className={`rounded-2xl shadow-lg p-6 border-2 animate-slide-in ${
                  crit.gravita === 'alta'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-orange-50 border-orange-300'
                } stagger-${Math.min(index + 4, 6)}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    crit.gravita === 'alta' ? 'bg-red-200' : 'bg-orange-200'
                  }`}>
                    <crit.icon className={`w-6 h-6 ${
                      crit.gravita === 'alta' ? 'text-red-700' : 'text-orange-700'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        crit.gravita === 'alta'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-orange-200 text-orange-800'
                      }`}>
                        {crit.categoria}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        crit.gravita === 'alta'
                          ? 'bg-red-600 text-white'
                          : 'bg-orange-600 text-white'
                      }`}>
                        {crit.gravita === 'alta' ? '⚠️ ALTA' : '⚡ MEDIA'}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      crit.gravita === 'alta' ? 'text-red-900' : 'text-orange-900'
                    }`}>
                      {crit.titolo}
                    </h3>
                    <p className={crit.gravita === 'alta' ? 'text-red-800' : 'text-orange-800'}>
                      {crit.descrizione}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Raccomandazione Finale */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-2xl p-8 text-white mb-8 animate-slide-in">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <XCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">Raccomandazione Finale</h3>
              <p className="text-blue-100 text-sm font-['Space_Mono']">Basata sull'analisi approfondita del preventivo</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <p className="text-xl leading-relaxed text-white/95 mb-4">
              <span className="font-bold text-red-300">Non consigliamo di procedere con questo preventivo.</span> Le criticità emerse evidenziano una struttura contrattuale che trasferisce i rischi sulla tua azienda e crea dipendenza dall'agenzia.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-blue-200">🎯 Perché Scegliere l'Autonomia</h4>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10">
              <h5 className="font-bold text-base md:text-lg mb-2 text-green-300 break-words">✓ Controllo Totale della Strategia</h5>
              <p className="text-blue-50 leading-relaxed">
                Con competenze interne, sei tu a decidere priorità, budget e direzione. Nessuna dipendenza da terzi per modifiche o ottimizzazioni.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10">
              <h5 className="font-bold text-base md:text-lg mb-2 text-green-300 break-words">✓ Conoscenza Profonda del Tuo Business</h5>
              <p className="text-blue-50 leading-relaxed">
                Un team interno vive il tuo prodotto ogni giorno. Comprende sfumature, valori e obiettivi che un'agenzia esterna non potrà mai cogliere appieno.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10">
              <h5 className="font-bold text-base md:text-lg mb-2 text-green-300 break-words">✓ Formazione dell'Imprenditore</h5>
              <p className="text-blue-50 leading-relaxed">
                Come imprenditore, formarti sul marketing ti permette di gestirlo in autonomia e, se deciderai di delegarlo in futuro, sarai in grado di verificare il lavoro svolto. Non dipenderai più da chi "dice di fare", ma saprai esattamente cosa viene fatto e perché.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10">
              <h5 className="font-bold text-base md:text-lg mb-2 text-green-300 break-words">✓ Proprietà di Dati e Contenuti</h5>
              <p className="text-blue-50 leading-relaxed">
                Tutto ciò che crei rimane tuo: dati, insights, contenuti, strategie. Costruisci un patrimonio aziendale invece di dipendere da asset esterni.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10">
              <h5 className="font-bold text-base md:text-lg mb-2 text-green-300 break-words">✓ Agilità e Velocità di Esecuzione</h5>
              <p className="text-blue-50 leading-relaxed">
                Niente più attese per approvazioni o modifiche. Il tuo team può testare, iterare e ottimizzare in tempo reale, cogliendo opportunità di mercato.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border-2 border-green-400/30">
            <p className="text-white/90 font-semibold text-lg mb-2">💡 Il Vero Valore dell'Autonomia</p>
            <p className="text-white/80 leading-relaxed">
              Investire nella formazione del team non è solo una questione economica. È una scelta strategica che ti rende padrone del tuo destino, 
              libero di sperimentare, crescere e adattarti senza vincoli esterni. Le agenzie hanno i loro interessi; il tuo team ha solo i tuoi.
            </p>
          </div>
        </div>

        {/* Video CTA */}
        <div className="my-8 animate-slide-in">
          <a
            href="https://leonemasterschool.it/valutatore-preventivi-marketing-video/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-[#132E55] to-[#A38C54] text-white py-6 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 text-center"
          >
            🎥 Guarda il Video di Approfondimento
            <p className="text-sm font-normal mt-2 opacity-90">
              Scopri come prendere decisioni strategiche più consapevoli per il tuo business
            </p>
          </a>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full bg-white text-slate-900 py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-2 border-slate-200 animate-slide-in"
        >
          Valuta un Altro Preventivo
        </button>
      </div>
    </div>
  );
}

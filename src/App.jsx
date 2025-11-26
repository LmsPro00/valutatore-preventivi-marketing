import React, { useState } from 'react'
import ValutatorePreventivi from './components/ValutatorePreventivi'
import RisultatiValutazione from './components/RisultatiValutazione'

function App() {
  const [currentPage, setCurrentPage] = useState('form') // 'form' o 'results'
  const [evaluationData, setEvaluationData] = useState(null)

  const handleEvaluationComplete = (data) => {
    setEvaluationData(data)
    setCurrentPage('results')
  }

  const handleBackToForm = () => {
    setCurrentPage('form')
    setEvaluationData(null)
  }

  return (
    <>
      {currentPage === 'form' ? (
        <ValutatorePreventivi onEvaluationComplete={handleEvaluationComplete} />
      ) : (
        <RisultatiValutazione data={evaluationData} onBack={handleBackToForm} />
      )}
    </>
  )
}

export default App

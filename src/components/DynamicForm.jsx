import { useState } from 'react'
import { validateForm, sanitizeInput } from '../utils/validation'

const ACTION_TYPES = {
  contact: 'contact',
  don: 'don',
  benevolat: 'benevolat',
  info: 'info'
}

const ACTION_LABELS = {
  contact: 'Contact',
  don: 'Don',
  benevolat: 'Bénévolat',
  info: 'Demande d\'information'
}

function DynamicForm({ onSubmit }) {
  const [actionType, setActionType] = useState('')
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Helper function for input classes
  const getInputClasses = (hasError) => 
    `w-full px-4 py-3 bg-white/90 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
      hasError ? 'border-red-400 bg-red-50/50' : 'border-white/30 hover:border-white/50'
    }`

  const getLabelClasses = () => 
    'block text-sm font-semibold text-gray-800 mb-2'

  const getErrorClasses = () => 
    'mt-2 text-sm text-red-400 font-medium flex items-center gap-1'

  const handleActionTypeChange = (e) => {
    const newType = e.target.value
    setActionType(newType)
    setFormData({})
    setErrors({})
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === 'checkbox' ? checked : sanitizeInput(value)
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateForm(actionType, formData)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    
    // Simuler un envoi (remplacer par un vrai appel API)
    setTimeout(() => {
      const submissionData = {
        actionType,
        ...formData,
        submittedAt: new Date().toISOString()
      }
      onSubmit(submissionData)
      setIsSubmitting(false)
    }, 1000)
  }

  const renderContactFields = () => (
    <>
      <div>
        <label htmlFor="nom" className={getLabelClasses()}>
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.nom)}
          placeholder="Votre nom"
        />
        {errors.nom && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.nom}
        </p>}
      </div>

      <div>
        <label htmlFor="email" className={getLabelClasses()}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.email)}
          placeholder="votre@email.com"
        />
        {errors.email && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.email}
        </p>}
      </div>

      <div>
        <label htmlFor="telephone" className={getLabelClasses()}>
          Téléphone
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone || ''}
          onChange={handleInputChange}
          className={getInputClasses(false)}
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      <div>
        <label htmlFor="message" className={getLabelClasses()}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message || ''}
          onChange={handleInputChange}
          rows="5"
          className={getInputClasses(errors.message)}
          placeholder="Votre message..."
        />
        {errors.message && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.message}
        </p>}
      </div>
    </>
  )

  const renderDonFields = () => (
    <>
      <div>
        <label htmlFor="nom" className={getLabelClasses()}>
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.nom)}
          placeholder="Votre nom"
        />
        {errors.nom && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.nom}
        </p>}
      </div>

      <div>
        <label htmlFor="email" className={getLabelClasses()}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.email)}
          placeholder="votre@email.com"
        />
        {errors.email && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.email}
        </p>}
      </div>

      <div>
        <label htmlFor="montant" className={getLabelClasses()}>
          Montant (€) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="montant"
          name="montant"
          value={formData.montant || ''}
          onChange={handleInputChange}
          min="1"
          step="0.01"
          className={getInputClasses(errors.montant)}
          placeholder="50.00"
        />
        {errors.montant && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.montant}
        </p>}
      </div>

      <div>
        <label htmlFor="recurrence" className={getLabelClasses()}>
          Récurrence <span className="text-red-500">*</span>
        </label>
        <select
          id="recurrence"
          name="recurrence"
          value={formData.recurrence || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.recurrence)}
        >
          <option value="">Sélectionnez une option</option>
          <option value="unique">Don unique</option>
          <option value="mensuel">Don mensuel</option>
          <option value="trimestriel">Don trimestriel</option>
          <option value="annuel">Don annuel</option>
        </select>
        {errors.recurrence && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.recurrence}
        </p>}
      </div>

      <div>
        <label htmlFor="message" className={getLabelClasses()}>
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message || ''}
          onChange={handleInputChange}
          rows="4"
          className={getInputClasses(false)}
          placeholder="Un message pour nous..."
        />
      </div>
    </>
  )

  const renderBenevolatFields = () => (
    <>
      <div>
        <label htmlFor="nom" className={getLabelClasses()}>
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.nom)}
          placeholder="Votre nom"
        />
        {errors.nom && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.nom}
        </p>}
      </div>

      <div>
        <label htmlFor="email" className={getLabelClasses()}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.email)}
          placeholder="votre@email.com"
        />
        {errors.email && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.email}
        </p>}
      </div>

      <div>
        <label htmlFor="telephone" className={getLabelClasses()}>
          Téléphone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.telephone)}
          placeholder="+33 6 12 34 56 78"
        />
        {errors.telephone && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.telephone}
        </p>}
      </div>

      <div>
        <label htmlFor="disponibilite" className={getLabelClasses()}>
          Disponibilité <span className="text-red-500">*</span>
        </label>
        <select
          id="disponibilite"
          name="disponibilite"
          value={formData.disponibilite || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.disponibilite)}
        >
          <option value="">Sélectionnez une option</option>
          <option value="weekend">Week-end</option>
          <option value="semaine">En semaine</option>
          <option value="flexible">Flexible</option>
        </select>
        {errors.disponibilite && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.disponibilite}
        </p>}
      </div>

      <div>
        <label htmlFor="competences" className={getLabelClasses()}>
          Compétences / Domaines d'intérêt
        </label>
        <textarea
          id="competences"
          name="competences"
          value={formData.competences || ''}
          onChange={handleInputChange}
          rows="4"
          className={getInputClasses(false)}
          placeholder="Décrivez vos compétences ou domaines d'intérêt..."
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message || ''}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Votre message..."
        />
      </div>
    </>
  )

  const renderInfoFields = () => (
    <>
      <div>
        <label htmlFor="nom" className={getLabelClasses()}>
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.nom)}
          placeholder="Votre nom"
        />
        {errors.nom && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.nom}
        </p>}
      </div>

      <div>
        <label htmlFor="email" className={getLabelClasses()}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.email)}
          placeholder="votre@email.com"
        />
        {errors.email && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.email}
        </p>}
      </div>

      <div>
        <label htmlFor="sujet" className={getLabelClasses()}>
          Sujet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="sujet"
          name="sujet"
          value={formData.sujet || ''}
          onChange={handleInputChange}
          className={getInputClasses(errors.sujet)}
          placeholder="Sujet de votre demande"
        />
        {errors.sujet && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.sujet}
        </p>}
      </div>

      <div>
        <label htmlFor="message" className={getLabelClasses()}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message || ''}
          onChange={handleInputChange}
          rows="5"
          className={getInputClasses(errors.message)}
          placeholder="Votre demande d'information..."
        />
        {errors.message && <p className={getErrorClasses()}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.message}
        </p>}
      </div>
    </>
  )

  const renderFields = () => {
    switch (actionType) {
      case ACTION_TYPES.contact:
        return renderContactFields()
      case ACTION_TYPES.don:
        return renderDonFields()
      case ACTION_TYPES.benevolat:
        return renderBenevolatFields()
      case ACTION_TYPES.info:
        return renderInfoFields()
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="actionType" className={getLabelClasses()}>
          Type d'action <span className="text-red-500">*</span>
        </label>
        <select
          id="actionType"
          value={actionType}
          onChange={handleActionTypeChange}
          className={getInputClasses(errors.actionType)}
          required
        >
          <option value="">Sélectionnez un type d'action</option>
          <option value={ACTION_TYPES.contact}>{ACTION_LABELS.contact}</option>
          <option value={ACTION_TYPES.don}>{ACTION_LABELS.don}</option>
          <option value={ACTION_TYPES.benevolat}>{ACTION_LABELS.benevolat}</option>
          <option value={ACTION_TYPES.info}>{ACTION_LABELS.info}</option>
        </select>
        {errors.actionType && <p className="mt-2 text-sm text-red-400 font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.actionType}
        </p>}
      </div>

      {actionType && (
        <div className="space-y-5 pt-6 border-t border-white/20 animate-fade-in">
          {renderFields()}
        </div>
      )}

      {actionType && (
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
            isSubmitting
              ? 'bg-gray-500 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Envoyer
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          )}
        </button>
      )}
    </form>
  )
}

export default DynamicForm


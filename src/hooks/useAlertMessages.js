import { useCallback } from 'react'
import { useAlert } from '../contexts/AlertContext'

// Custom hook providing pre-defined alert patterns
export const useAlertMessages = () => {
  const { showAlert } = useAlert()

  const showSuccess = useCallback((message, onClose) => {
    showAlert('Onnistui', message, { type: 'success', onClose })
  }, [showAlert])

  const showError = useCallback((message, onClose) => {
    showAlert('Virhe', message, { type: 'error', onClose })
  }, [showAlert])

  const showInfo = useCallback((message, onClose) => {
    showAlert('Info', message, { type: 'info', onClose })
  }, [showAlert])

  const showWarning = useCallback((message, { onConfirm, onCancel } = {}) => {
    showAlert('Varoitus', message, {
      type: 'warning',
      onClose: onConfirm,
      onCancel,
      showCancelButton: true
    })
  }, [showAlert])

  return { showSuccess, showError, showInfo, showWarning }
}
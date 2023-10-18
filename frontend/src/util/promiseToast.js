import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useToast = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const showPromiseToast = ({ promise, successMessage }) => {
    toast.promise(promise, {
      success: successMessage ? successMessage : lang.toast_success,
      pending: lang.toast_sending,
      error: {
        render({ data }) {
          return (
            <>
              <p>{lang.toast_failed}</p>
              {data.response.data.error ? (
                <p>Reason: {data.response.data.error}</p>
              ) : (
                <></>
              )}
            </>
          )
        },
      },
    })
  }
  const showErrorToast = (promise) => {
    toast.promise(promise, {
      error: {
        render({ data }) {
          if (data.response.status === 403) {
            return (
              <>
                <p>{lang.toast_unauthorized}</p>
                {data.response.data.error ? (
                  <p>Reason: {data.response.data.error}</p>
                ) : (
                  <></>
                )}
              </>
            )
          } else if (data.response.status === 400) {
            return (
              <>
                <p>{lang.toast_failed}</p>
                {data.response.data.error ? (
                  <p>Reason: {data.response.data.error}</p>
                ) : (
                  <></>
                )}
              </>
            )
          }
        },
      },
    })
  }
  return { showPromiseToast, showErrorToast }
}

export default useToast

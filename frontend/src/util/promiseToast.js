import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useToast = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  const showPromiseToast = ({ promise, successMessage }) => {
    toast.promise(promise, {
      success: successMessage ? successMessage : lang.toast_success,
      pending: lang.toast_sending,
      error: {
        render({ data }) {
          return (
            <>
              {data.response.data.error ? (
                <p>
                  {data.response.data.error[selectedLang] ||
                    data.response.data.error.en}
                </p>
              ) : (
                <p>{lang.toast_failed}</p>
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
          return (
            <>
              {data.response.data && data.response.data.error ? (
                <p>
                  {data.response.data.error[selectedLang] ||
                    data.response.data.error.en}
                </p>
              ) : (
                <>
                  {data.response.status === 403 ? (
                    <p>{lang.toast_unauthorized}</p>
                  ) : (
                    <p>{lang.toast_failed}</p>
                  )}
                </>
              )}
            </>
          )
        },
      },
    })
  }
  const showErrorToastNoPromise = (error) => {
    if (error && error.response) {
      toast.error(
        error.response.data && error.response.data.error ? (
          <p>
            {error.response.data.error[selectedLang] ||
              error.response.data.error.en}
          </p>
        ) : (
          <>
            {error.response.status === 403 ? (
              <p>{lang.toast_unauthorized}</p>
            ) : (
              <p>{lang.toast_failed}</p>
            )}
          </>
        )
      )
    }
  }
  return { showPromiseToast, showErrorToast, showErrorToastNoPromise }
}

export default useToast

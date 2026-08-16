import React, { useEffect, useState } from 'react'

import Constant from '../../../../shared/utils/const'
import Converter from './Converter'
import { isGateConfigured, verifyGatePassword } from './gate'

const CcBillToCsv: React.FC = () => {
  // Deliberately not persisted: an unlock lasts as long as this component does,
  // so leaving or reloading the page asks for the password again.
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    document.title = `${Constant.BASE_TITLE} | Credit Card Bill to CSV`
  }, [])

  const handleUnlock = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsChecking(true)
    setError('')
    try {
      if (await verifyGatePassword(password)) {
        setIsUnlocked(true)
        setPassword('')
        return
      }
      setError('Wrong password.')
    } finally {
      setIsChecking(false)
    }
  }

  if (isUnlocked) return <Converter />

  return (
    <div className="flex flex-1 flex-col px-5 py-10 md:px-8">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Credit Card Bill to CSV
        </h1>
        <p className="mt-3 text-neutral-500">
          A personal tool, input the correct password to access this page.
        </p>

        {isGateConfigured() ? (
          <form
            onSubmit={handleUnlock}
            className="mt-8 flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6"
          >
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-800">
                Page password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900"
              />
            </label>

            <button
              type="submit"
              disabled={isChecking || !password}
              className="self-start rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              {isChecking ? 'Checking…' : 'Unlock'}
            </button>

            {error && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}
          </form>
        ) : (
          <p
            role="alert"
            className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 text-sm font-medium text-red-600 shadow-sm md:p-6"
          >
            This page has no password set yet, so it stays closed.
          </p>
        )}
      </div>
    </div>
  )
}

export default CcBillToCsv

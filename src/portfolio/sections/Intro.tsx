import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const DURATION = 5000 // ms visible antes de desaparecer
const FADE = 600 // ms de fundido de salida

export function Intro({ onDone }: { onDone: () => void }) {
  const { t } = useLanguage()
  const [leaving, setLeaving] = useState(false)
  const [isMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 640 : false))
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => setLeaving(true), DURATION - FADE)
    const t2 = setTimeout(() => onDoneRef.current(), DURATION)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  const skip = () => {
    setLeaving(true)
    setTimeout(() => onDoneRef.current(), FADE)
  }

  return (
    <div
      onClick={skip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#f5f5f7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        padding: isMobile ? '0 28px' : 0,
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE}ms ease`,
        fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Segoe UI',system-ui,Helvetica,Arial,sans-serif",
      }}
    >
      {/* glow ambiental */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '46%' : '50%',
          left: '50%',
          width: isMobile ? 460 : 760,
          height: isMobile ? 460 : 760,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(191,72,0,.08) 0%, rgba(191,72,0,0) 70%)',
          animation: 'introBgFloat 9s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 600, letterSpacing: isMobile ? '.32em' : '.34em', textTransform: 'uppercase', color: '#bf4800', opacity: 0, animation: 'introFadeUp .7s cubic-bezier(.2,.7,.2,1) .25s forwards' }}>
          {t('intro_kicker')}
        </div>
        <div style={{ overflow: 'hidden', padding: isMobile ? '0 .06em 4px' : '0 .08em', marginTop: isMobile ? 18 : 20 }}>
          <div
            aria-hidden="true"
            style={{
              margin: 0,
              fontSize: isMobile ? 'clamp(40px,13vw,60px)' : 'clamp(44px,9vw,104px)',
              lineHeight: isMobile ? 1.0 : 0.96,
              fontWeight: 600,
              letterSpacing: isMobile ? '-.03em' : '-.035em',
              color: '#1d1d1f',
              textAlign: 'center',
              transform: 'translateY(115%)',
              animation: 'introMaskUp 1.05s cubic-bezier(.16,1,.3,1) .55s forwards',
            }}
          >
            {isMobile ? <>Renzo<br />Ramos</> : 'Renzo Ramos'}
          </div>
        </div>
        <div style={{ width: isMobile ? 46 : 50, height: 1.5, background: '#1d1d1f', marginTop: isMobile ? 24 : 28, transform: 'scaleX(0)', transformOrigin: 'center', animation: 'introLine .7s cubic-bezier(.7,0,.3,1) 1.5s forwards' }} />
        <div style={{ marginTop: isMobile ? 22 : 24, fontSize: isMobile ? 'clamp(15px,4.4vw,17px)' : 'clamp(16px,2vw,20px)', lineHeight: isMobile ? 1.45 : 1.4, color: '#6e6e73', fontWeight: 400, textAlign: 'center', maxWidth: isMobile ? '18ch' : '26ch', opacity: 0, animation: 'introFadeUp .8s cubic-bezier(.2,.7,.2,1) 1.75s forwards' }}>
          {t('intro_role')}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: isMobile ? 32 : 34 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#bf4800', opacity: 0, animation: 'introFadeUp .4s ease 2.1s forwards, introDotPulse 1.2s ease-in-out 2.5s infinite' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#bf4800', opacity: 0, animation: 'introFadeUp .4s ease 2.2s forwards, introDotPulse 1.2s ease-in-out 2.65s infinite' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#bf4800', opacity: 0, animation: 'introFadeUp .4s ease 2.3s forwards, introDotPulse 1.2s ease-in-out 2.8s infinite' }} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: isMobile ? 34 : 26, left: 0, right: 0, textAlign: 'center', fontSize: 11.5, letterSpacing: '.04em', color: '#a1a1a6' }}>
        {t('intro_skip')}
      </div>
    </div>
  )
}

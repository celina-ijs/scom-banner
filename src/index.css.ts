import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const containerStyle = Styles.style({
  width: 'var(--layout-container-width)',
  maxWidth: 'var(--layout-container-max_width)',
  overflow: 'var(--layout-container-overflow)',
  textAlign: ('var(--layout-container-text_align)' as any),
  margin: '0 auto'
})

export const backgroundStyle = Styles.style({
  backgroundPosition: 'center !important',
  backgroundSize: 'cover !important'
})

export const actionButtonStyle = Styles.style({
  boxShadow: 'none',
  $nest: {
    '&:hover': {
      filter: 'brightness(0.85)'
    },
    '> i-icon:hover': {
      fill: '#fff !important'
    }
  }
})
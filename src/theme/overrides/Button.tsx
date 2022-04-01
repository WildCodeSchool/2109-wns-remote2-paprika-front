export default function Button(theme: any) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
          borderRadius: theme.shape.borderRadius * 2,
          fontWeight: 700,
          lineHeight: 24 / 14,
          fontSize: 15,
          textTransform: 'capitalize',
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.shadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.shadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.shadows.secondary,
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          color: theme.palette.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}

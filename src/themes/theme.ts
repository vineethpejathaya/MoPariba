import {extendTheme} from 'native-base';

const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 15,
  xl: 16,
  '2xl': 18,
  '3xl': 20,
  '4xl': 25,
  '5xl': 30,
};

const lineHeight = {
  xs: 15,
  sm: 16,
  md: 18,
  lg: 19,
  xl: 20,
  '2xl': 21,
  '3xl': 22,
  '4xl': 24,
  '5xl': 27,
  '6xl': 30,
  '7xl': 36,
  '8xl': 37,
};

const fontWeight = {
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const theme = extendTheme({
  colors: {
    primary: {
      50: '#EBFFD7',
      100: '#CFEA80',
      200: '#A3D862',
      400: '#94da4c',
      500: '#6CC51D',
      700: '#47A9DA',
      800: '#28B446',
      900: '#019543',
    },
    gray: {
      30: '#EBEBEB',
      50: '#F6F6F6',
      70: '#C3A894',
      100: '#DCDCDC',
      200: '#F5F5F5',
      300: '#F4F5F9',
      400: '#F0F5FA',
      500: '#ECF0F4',
      600: '#C4C4C4',
      700: '#98A8B8',
      900: '#868889',
    },
    orange: {
      100: '#E8AD41',
      200: '#FFC107',
      700: '#FE585A',
    },
    blue: {
      100: '#E9F5FA',
      500: '#2382AA',
    },
    red: {
      100: '#FEE4E4',
      400: '#F56262',
      600: '#FE585A',
    },
    white: '#FFFFFF',
  },
  fontConfig: {
    Poppins: {
      400: {
        normal: 'Poppins-Regular',
      },
      500: {
        normal: 'Poppins-Medium',
      },
      600: {
        normal: 'Poppins-SemiBold',
      },
      700: {
        normal: 'Poppins-Bold',
      },
    },
    Sen: {
      400: {
        normal: 'Sen-Regular',
      },
      500: {
        normal: 'Sen-Medium',
      },

      700: {
        normal: 'Sen-Bold',
      },
    },
    DMSans: {
      400: {
        normal: 'DMSans-Regular',
      },
      500: {
        normal: 'DMSans-Medium',
      },
      600: {
        normal: 'DMSans-SemiBold',
      },
      700: {
        normal: 'DMSans-Bold',
      },
    },
  },
  fonts: {
    poppins: 'Poppins',
    dmSans: 'DMSans',
    sen: 'Sen',
  },
  fontSizes: fontSize,
  lineHeights: lineHeight,
  fontWeights: fontWeight,
  components: {
    Text: {
      baseStyle: {
        fontFamily: 'dmSans',
        color: 'black',
      },
      variants: {
        heading: {
          fontFamily: 'poppins',
          fontWeight: 'bold',
          fontSize: '4xl',
          lineHeight: '8xl',
        },
        heading2: {
          fontFamily: 'dmSans',
          fontWeight: 'bold',
          fontSize: '5xl',
          lineHeight: '7xl',
        },
        header1: {
          fontFamily: 'poppins',
          fontWeight: 'bold',
          fontSize: '3xl',
          lineHeight: '6xl',
        },
        header2: {
          fontFamily: 'dmSans',
          fontWeight: 'bold',
          fontSize: '3xl',
          lineHeight: '4xl',
        },
        subheader1: {
          fontFamily: 'poppins',
          fontWeight: 'semiBold',
          fontSize: '2xl',
          lineHeight: '5xl',
        },
        subheader2: {
          fontFamily: 'dmSans',
          fontWeight: 'semiBold',
          fontSize: '2xl',
          lineHeight: '2xl',
        },
        title1: {
          fontFamily: 'poppins',
          fontWeight: 'semiBold',
          fontSize: 'lg',
          lineHeight: '3xl',
        },
        title2: {
          fontFamily: 'dmSans',
          fontWeight: 'semiBold',
          fontSize: 'xl',
          lineHeight: 'lg',
        },
        subTitle1: {
          fontFamily: 'poppins',
          fontWeight: 'medium',
          fontSize: 'sm',
          lineHeight: 'sm',
        },
        subTitle2: {
          fontFamily: 'dmSans',
          fontWeight: 'medium',
          fontSize: 'md',
          lineHeight: 'xl',
        },
        label1: {
          fontFamily: 'poppins',
          fontWeight: 'normal',
          fontSize: 'sm',
          lineHeight: 'md',
        },
        label2: {
          fontFamily: 'dmSans',
          fontWeight: 'normal',
          fontSize: 'md',
          lineHeight: 'xl',
        },
        body1: {
          fontFamily: 'poppins',
          fontWeight: 'normal',
          fontSize: 'sm',
          lineHeight: 'md',
        },
        body2: {
          fontFamily: 'dmSans',
          fontWeight: 'normal',
          fontSize: 'xs',
          lineHeight: 'xs',
        },
      },
      defaultProps: {
        variant: 'body1',
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 12,
        height: 62,
        padding: '10px 40px',
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: 18,
        color: 'primary.900',
      },
      variants: {
        solid: {
          bg: 'primary.900',
          _text: {
            fontFamily: 'Sen-Bold',
            color: 'white',
            fontSize: 28,
            fontWeight: 700,
          },
          _pressed: {
            bg: 'secondary',
          },
          _disabled: {
            bg: 'gray.700',
            _text: {
              color: 'gray.900',
            },
          },
        },
        outline: {
          bg: 'white',
          borderColor: 'primary.900',
          borderWidth: 1,
          _text: {
            color: 'primary.900',
          },
          _pressed: {
            bg: 'white',
            borderColor: 'secondary',
          },
          _disabled: {
            borderColor: 'gray.400',
            _text: {
              color: 'gray.700',
            },
          },
        },
        link: {
          bg: 'transparent',
          _text: {
            color: 'primary.700',
          },
          _disabled: {
            _text: {
              color: 'gray.700',
            },
          },
        },
        ghost: {
          bg: 'transparent',
          padding: 0,
          _text: {
            padding: 0,
            color: 'primary.700',
          },
          _disabled: {
            _text: {
              color: 'gray.700',
            },
          },
        },
      },
    },
    Input: {
      baseStyle: {
        borderWidth: 0,
        borderRadius: 'md',
        height: 62,
        _focus: {
          borderColor: 'none',
        },
        _invalid: {
          borderColor: 'red.600',
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'outline',
      },

      variants: {
        outline: {
          border: 'none',
          bg: '#F6F6F6',
        },
        filled: {
          bg: '#F4F5F9',
          borderColor: 'gray.300',
          _focus: {
            bg: 'gray.200',
            borderColor: 'gray.600',
          },
        },
      },
      sizes: {
        md: {
          fontSize: 'md',
          px: 4,
          py: 2,
        },
        lg: {
          fontSize: 'lg',
          px: 5,
          py: 3,
        },
      },
    },
  },
});

export default theme;

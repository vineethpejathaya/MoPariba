import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#CFEA80',
      100: '#EBFFD7',
      200: '#A3D862',
      400: '#47A9DA',
      500: '#28B446',
      700: '#6CC51D',
      900: '#019543',
    },
    gray: {
      30: '#EBEBEB',
      50: '#F6F6F6',
      100: '#DCDCDC',
      200: '#F5F5F5',
      300: '#F4F5F9',
      400: '#F0F5FA',
      500: '#ECF0F4',
      600: '#C4C4C4',
      700: '#98A8B8',
      900: '#868889 ',
    },
    orange: {
      100: '#E8AD41',
      200: '#FFC107',
      700: '#FE585A',
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
      800: {
        normal: 'Poppins-ExtraBold',
      },
      900: {
        normal: 'Poppins-Black',
      },
    },
    Sen: {
      400: {
        normal: 'Sen-Regular',
      },
      500: {
        normal: 'Sen-Medium',
      },
      600: {
        normal: 'Sen-SemiBold',
      },
      700: {
        normal: 'Sen-Bold',
      },
      800: {
        normal: 'Sen-ExtraBold',
      },
      900: {
        normal: 'Sen-Black',
      },
    },
  },
  fonts: {
    poppins: 'Poppins',
    sen: 'Sen',
  },
  components: {
    Text: {
      baseStyle: {
        fontFamily: 'sen',
        color: 'black',
      },
      variants: {
        heading: {
          fontFamily: 'poppins',
          fontWeight: 700,
          fontSize: 25,
          lineHeight: 37.5,
        },
        heading2: {
          fontFamily: 'sen',
          fontWeight: 700,
          fontSize: 30,
          lineHeight: 36,
        },
        header1: {
          fontFamily: 'poppins',
          fontWeight: 600,
          fontSize: 20,
          lineHeight: 30,
        },
        header2: {
          fontFamily: 'sen',
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 24.06,
        },
        subheader1: {
          fontFamily: 'poppins',
          fontWeight: 500,
          fontSize: 18,
          lineHeight: 27,
        },
        subheader2: {
          fontFamily: 'sen',
          fontWeight: 700,
          fontSize: 18,
          lineHeight: 21.66,
        },
        title1: {
          fontFamily: 'poppins',
          fontWeight: 600,
          fontSize: 15,
          lineHeight: 22.5,
        },
        title2: {
          fontFamily: 'sen',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 19.25,
        },
        subTitle1: {
          fontFamily: 'poppins',
          fontWeight: 600,
          fontSize: 12,
          lineHeight: 18,
        },
        subTitle2: {
          fontFamily: 'sen',
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 16.84,
        },
        label1: {
          fontFamily: 'poppins',
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 19.56,
        },
        label2: {
          fontFamily: 'sen',
          fontWeight: 400,
          fontSize: 13,
          lineHeight: 15.64,
        },
        body1: {
          fontFamily: 'poppins',
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 18,
        },
        body2: {
          fontFamily: 'poppins',
          fontWeight: 500,
          fontSize: 10,
          lineHeight: 15,
        },
      },
      defaultProps: {
        variant: 'poppins',
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 12,
        height: 62,
        padding: '10px 40px',
        textTransform: 'capitalize',
        fontWeight: 700,
        fontSize: 16,
        color: 'primary.900',
      },
      variants: {
        solid: {
          bg: 'primary.900',
          _text: {
            fontFamily: 'sen',
            color: 'white',
            fontSize: 18,
            fontWeight: 700,
          },
          _pressed: {
            bg: 'secondary',
          },
        },
        outline: {
          bg: 'transparent',
          borderColor: 'primary',
          borderWidth: 1,
          _text: {
            color: 'primary',
          },
          _pressed: {
            bg: 'primary',
            borderColor: 'secondary',
          },
        },
        link: {
          bg: 'transparent',
          _text: {
            color: 'primary.700',
          },
        },
        ghost: {
          bg: 'transparent',
          _text: {
            color: 'primary.700',
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

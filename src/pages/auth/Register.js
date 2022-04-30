import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Link,
  Container,
  Typography,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Grid,
  StepConnector
} from '@mui/material';
// hooks
import PropTypes from "prop-types";
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { RegisterForm } from '../../sections/auth/register';
import Iconify from "../../components/Iconify";
import {VerifyCodeForm} from "../../sections/auth/verify-code";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const steps = [
  '填写信息',
  '接受验证码',
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function QontoStepIcon({ active, completed }) {
  return (
      <Box
          sx={{
            zIndex: 9,
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: active ? 'primary.main' : 'text.disabled',
          }}
      >
        {completed ? (
            <Iconify icon={'eva:checkmark-fill'} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
        ) : (
            <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'currentColor',
                }}
            />
        )}
      </Box>
  );
}

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="注册">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              已经拥有账号?{' '}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                直接登录
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              欢迎注册
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              alt="register"
              src="https://minimals.cc/assets/illustrations/illustration_register.png"
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>


            <Grid container justifyContent={'center'}>
              <Grid item xs={12} md={8} sx={{ mb: 5 }}>
                <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
                  {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel
                            StepIconComponent={QontoStepIcon}
                            sx={{
                              '& .MuiStepLabel-label': {
                                typography: 'subtitle2',
                                color: 'text.disabled',
                              },
                            }}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                  ))}
                </Stepper>
              </Grid>
            </Grid>


            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              登录或完成注册即代表你同意
              <Link underline="always" color="text.primary" href="#">
                用户协议
              </Link>
              和
              <Link underline="always" color="text.primary" href="#">
                隐私政策
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                已经拥有账号?{' '}
                <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
                  直接登录
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

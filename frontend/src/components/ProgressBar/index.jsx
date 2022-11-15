import PropTypes from 'prop-types';
import { useNProgress } from '@tanem/react-nprogress';
import Container from './Container';
import Bar from './Bar';

function Progress ({ isAnimating }) {
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating,
      })
    return (  
        <Container animationDuration={animationDuration} isFinished={isFinished}>
            <Bar animationDuration={animationDuration} progress={progress}></Bar>
        </Container>
    );
}

export default Progress;
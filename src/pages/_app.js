import '../styles/global.scss';

function App({ Component, pageProps }) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...pageProps} />;
}

export default App;

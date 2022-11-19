import PropTypes from 'prop-types';
import images from '../../assets/images';
import './Theme.scss';
import ThemeModalSection from './ThemeModalSection';

function ThemeModal ({
    className = "",
}) {
    // dark
    const themeBasic = {
        "--layout-bg": "#1e1e1e",
        "--sidebar-bg": "hsla(0,0%,100%,0.05)",
        "--navigation-text": "#a0a0a0",
        "--text-item-hover":"#fff",
        "--text-primary": "#fff",
        "--primary-bg": "#333",
        "--text-secondary": "hsla(0,0%,100%,0.5)",
        "--alpha-bg": "hsla(0,0%,100%,0.1)",    
        "--colorSearch-default": " hsla(0,0%,100%,0.1)",
        "--search-text": "#eee",
        "--bg-link": "",
    }

    const lightBasic = {
        "--layout-bg": "#fff",
        "--sidebar-bg": "rgba(0,0,0,0.05)",
        "--navigation-text": "#32323d",
        "--text-item-hover":"#8d22c3",
        "--text-primary": "#32323d",
        "--primary-bg": "#fff",
        "--text-secondary": "rgba(0,0,0,0.6)",
        "--alpha-bg": "rgba(0,0,0,0.05)", 
        "--colorSearch-default": " rgba(0,0,0,0.05)",
        "--search-text": "#282828",
        "--purple-primary": "#8d22c3",
        "--link-text-hover": "#8d22c3",
        "--bg-link":"",
    }

    const dataSection = [
        { 
            title: 'Tối',
            theme: {
                name: 'dark',
                logo: images.logoDark,
                styles: { 
                    ... themeBasic,
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dark.jpg")' },
        { 
            title: 'Tím', 
            theme: {
                name: 'violet',
                logo: images.logoDark,
                styles: { 
                    ... themeBasic,
                    "--layout-bg": "#170f23",
                    "--primary-bg": "#34224f",
                    "--link-text-hover": "#c273ed",
                    "--search-text": "#eee",
                    "--bg-link": "",
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/purple.jpg")' },
        { 
            title: 'Xanh Đậm', 
            theme: {
                name: 'darkBlue',
                logo: images.logoDark,
                styles: { 
                    ... themeBasic,
                    "--layout-bg": "#0f1a2e",
                    "--primary-bg": "#173b45",
                    "--link-text-hover": "#0daf94",
                    "--purple-primary": "#158370",
                    "--search-text": "#eee",
                    "--bg-link": "",
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue.jpg")' },
        { title: 'Xanh Biển', background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue-light.jpg")' },
        { title: 'Xanh Lá', background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green.jpg")' },
        { title: 'Xanh Nâu', background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/brown.jpg")' },
        { title: 'Xanh Hồng', background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink.jpg")' },
        { title: 'Xanh Đỏ', background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/red.jpg")' },
    ]

    const dataSection2 = [
        { 
            title: 'Sáng',
            theme: {
                name: 'light',
                logo: images.logoLight,
                styles: { 
                    ... lightBasic,
                    "--layout-bg": "#fff",
                    "--sidebar-bg": "rgba(0,0,0,0.05)",
                    "--navigation-text": "#32323d",
                    "--text-item-hover":"#8d22c3",
                    "--text-primary": "#32323d",
                    "--primary-bg": "#fff",
                    "--text-secondary": "rgba(0,0,0,0.6)",
                    "--alpha-bg": "rgba(0,0,0,0.05)", 
                    "--colorSearch-default": " rgba(0,0,0,0.05)",
                    "--bg-link":"",
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/light.jpg")' },
        { 
            title: 'Xám', 
            theme: {
                name: 'grey',
                logo: images.logoLight,
                styles: { 
                    "--layout-bg": "#e5e3df",
                    "--primary-bg": "#f7f5f3",
                    "--sidebar-bg": "rgba(0,0,0,0.05)",
                    "--navigation-text": "#32323d",
                    "--text-item-hover":"#844d4d",
                    "--text-primary": "#32323d",
                    "--text-secondary": "rgba(0,0,0,0.6)",
                    "--alpha-bg": "rgba(0,0,0,0.05)", 
                    "--purple-primary": "#644646",
                    "--colorSearch-default": " rgba(0,0,0,0.05)",
                    "--bg-link":"",
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/gray.jpg")' },
        { 
            title: 'Xanh Nhạt', 
            theme: {
                name: 'lightBlue',
                logo: images.logoLight,
                styles: { 
                    ... lightBasic,
                    "--text-secondary": "#696969",
                    "--purple-primary": "#0e8080",
                    "--text-item-hover": "#0f7070",
                    "--link-text-hover": "#0f7070",
                    "--layout-bg": "#ced9d9",
                    "--sidebar-bg": "hsla(0,0%,100%,0.3)",
                    "--sidebar-popup-bg": "#cce0e0",
                    "--alpha-bg": "hsla(0,0%,100%,0.3)",
                    "--primary-bg": "#e0ebeb",
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green-light.jpg")' },
        { 
            title: 'Hồng Cánh Sen', 
            theme: {
                name: 'pink',
                logo: images.logoLight,
                styles: { 
                    ... lightBasic,
                    "--layout-bg": "#f9dbdb",
                    "--sidebar-bg": "hsla(0,0%,100%,0.3)",
                    "--primary-bg": "#fde8e8",
                    "--purple-primary": "#b72479",
                    "--text-item-hover": "#b72479",
                    "--link-text-hover": "#b72479",
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink-light.jpg")' },
    ]

    const dataSection3 = [
        { 
            title: 'Tháp Eiffel', 
            theme: {
                name: 'eiffel',
                logo: images.logoDark,
                styles: { 
                    ... themeBasic,
                    "--layout-bg": "#282828",
                    "--primary-bg": "#363636",
                    "--bg-link": 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/eiffel.jpg")',
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/eiffel.jpg")' },
        { 
            title: 'IU', 
            theme: {
                name: 'IU',
                logo: images.logoDark,
                styles: { 
                    ... lightBasic,
                    "--layout-bg": "#E6E1DE",
                    "--player-bg": "#F5E6E0",
                    "--primary-bg": "#EFEDEB",
                    "--purple-primary": "#C24793",
                    "--link-text-hover": "#AC3E82",
                    "--text-item-hover": "#AC3E82",
                    "--text-secondary": "#696969",
                    "--bg-link": 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/iu.jpg")',
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/iu.jpg")' },
        { title: 'Ji Chang Wook', background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/ji-chang-wook.jpg")' },
        { 
            title: 'Jisoo', 
            theme: {
                name: 'jisoo',
                logo: images.logoDark,
                styles: { 
                    ... lightBasic,
                    "--purple-primary": "#8D22C3",
                    "--primary-bg": "#FFFFFF",
                    "--link-text-hover": "#8D22C3",
                    "--text-item-hover": "#8D22C3",
                    "--bg-link": 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/jisoo.jpg")',
                },
            },
            background: 'url("https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jisoo.jpg")' },
    ]
    return (  
        <div className='themeModal__content'>
            <ThemeModalSection data={dataSection3} title="Chủ Đề"/>
            <ThemeModalSection data={dataSection} title="Màu Tối"/>
            <ThemeModalSection data={dataSection2} title="Màu Sáng"/>
        </div>
    );
}

ThemeModal.propTypes = {
    className: PropTypes.string
}

export default ThemeModal;
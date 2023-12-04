/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
    content: ["./components/**/*.{js,vue,ts,tsx}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts,tsx}", "./nuxt.config.{js,ts}", "./app.vue", "./views/**/*.{js,vue,ts,tsx}", "./node_modules/flowbite.{js,ts}"],
    // enable dark mode via class strategy
    darkMode: "class",

    theme: {
        extend: {},
        textColor: (theme) => theme("colors"),
        textOpacity: (theme) => theme("opacity"),
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            red: {
                50: "#ead7d7",
                100: "#eac0c0",
                200: "#ea9f9f",
                300: "#ea8888",
                400: "#ea6768",
                500: "#FB4F3B",
                600: "#FF3550",
                700: "#c73949",
                800: "#ad3240",
                900: "#8a2833",
            },
            // yellow: colors.amber,
            yellow: {
                50: "#fffff5",
                100: "#ffffe9",
                200: "#ffffcf",
                300: "#FAFED2",
                400: "#F7F294",
                500: "#F7D264",
                600: "#FBA53C",
                700: "#FF7A1F",
                800: "#c49500",
                900: "#a88000",
            },
            orange: {
                50: "#ffefdb",
                100: "#ffe6c7",
                200: "#ffd5a1",
                300: "#ffbc69",
                400: "#ffaf4d",
                500: "#ffa333",
                600: "#ff5733",
                700: "#d17400",
                800: "#b36300",
                900: "#8f4f00",
            },
            green: {
                100: "#CCFFE6",
                200: "#B3FFD9",
                300: "#99FFCC",
                400: "#66FFB3",
                500: "#47B36B",
                600: "#24B354",
                700: "#1F9948",
                800: "#156630",
                900: "#104D24",
            },
            blue: {
                50: "#f2f2f2",
                100: "#eaeef2",
                200: "#d3e2f2",
                300: "#accff2",
                400: "#8cbff2",
                500: "#67B0F0",
                600: "#51AAF8",
                700: "#1F86E3",
                800: "#3071ab",
                900: "#265987",
            },
            purple: {
                50: "#f2f2f2",
                100: "#eaeef2",
                200: "#B2ADF0",
                300: "#9890F0",
                400: "#8378F0",
                500: "#1C4BDB",
                600: "#4A3DCC",
                700: "#291F99",
                800: "#160D80",
                900: "#0A0073",
            },
            gray: {
                50: "#f5f5f5",
                100: "#ececea",
                200: "#d1d1d1",
                300: "#b2b2b2",
                400: "#909090",
                500: "#666666",
                600: "#4d4d4d",
                700: "#757575",
                800: "#2d2c2e",
                900: "#0d0d0d",
            },
            pink: {
                500: "#FB3C9C",
            },
        },
        spacing: {
            px: "1px",
            0: "0px",
            0.5: "0.125rem",
            1: "0.25rem",
            1.5: "0.375rem",
            2: "0.5rem",
            2.5: "0.625rem",
            3: "0.75rem",
            3.5: "0.875rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
            9: "2.25rem",
            10: "2.5rem",
            11: "2.75rem",
            12: "3rem",
            14: "3.5rem",
            16: "4rem",
            20: "5rem",
            24: "6rem",
            28: "7rem",
            32: "8rem",
            36: "9rem",
            40: "10rem",
            44: "11rem",
            48: "12rem",
            52: "13rem",
            56: "14rem",
            60: "15rem",
            64: "16rem",
            72: "18rem",
            80: "20rem",
            96: "24rem",
        },
        boxShadow: {
            sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
            none: "none",
        },
    },
    variants: {
        accessibility: ["responsive", "focus-within", "focus"],
        alignContent: ["responsive"],
        alignItems: ["responsive"],
        alignSelf: ["responsive"],
        animation: ["responsive"],
        appearance: ["responsive"],
        backdropBlur: ["responsive"],
        backdropBrightness: ["responsive"],
        backdropContrast: ["responsive"],
        backdropDropShadow: ["responsive"],
        backdropFilter: ["responsive"],
        backdropGrayscale: ["responsive"],
        backdropHueRotate: ["responsive"],
        backdropInvert: ["responsive"],
        backdropSaturate: ["responsive"],
        backdropSepia: ["responsive"],
        backgroundAttachment: ["responsive"],
        backgroundBlendMode: ["responsive"],
        backgroundClip: ["responsive"],
        backgroundColor: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus", "checked"],
        backgroundImage: ["responsive"],
        backgroundOpacity: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus"],
        backgroundPosition: ["responsive"],
        backgroundRepeat: ["responsive"],
        backgroundSize: ["responsive"],
        blur: ["responsive"],
        borderCollapse: ["responsive"],
        borderColor: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus", "checked", "disabled"],
        borderOpacity: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus"],
        borderRadius: ["responsive"],
        borderStyle: ["responsive"],
        borderWidth: ["responsive", "hover"],
        boxDecorationBreak: ["responsive"],
        boxShadow: ["responsive", "group-hover", "focus-within", "hover", "focus"],
        boxSizing: ["responsive"],
        brightness: ["responsive"],
        clear: ["responsive"],
        container: ["responsive"],
        contrast: ["responsive"],
        cursor: ["responsive", "disabled"],
        display: ["responsive", "disabled"],
        divideColor: ["responsive", "dark"],
        divideOpacity: ["responsive", "dark"],
        divideStyle: ["responsive"],
        divideWidth: ["responsive"],
        dropShadow: ["responsive"],
        fill: ["responsive"],
        filter: ["responsive"],
        flex: ["responsive"],
        flexDirection: ["responsive"],
        flexGrow: ["responsive"],
        flexShrink: ["responsive"],
        flexWrap: ["responsive"],
        float: ["responsive"],
        fontFamily: ["responsive"],
        fontSize: ["responsive"],
        fontSmoothing: ["responsive"],
        fontStyle: ["responsive"],
        fontVariantNumeric: ["responsive"],
        fontWeight: ["responsive"],
        gap: ["responsive"],
        gradientColorStops: ["responsive", "dark", "hover", "focus", "disabled"],
        grayscale: ["responsive"],
        gridAutoColumns: ["responsive"],
        gridAutoFlow: ["responsive"],
        gridAutoRows: ["responsive"],
        gridColumn: ["responsive"],
        gridColumnEnd: ["responsive"],
        gridColumnStart: ["responsive"],
        gridRow: ["responsive"],
        gridRowEnd: ["responsive"],
        gridRowStart: ["responsive"],
        gridTemplateColumns: ["responsive"],
        gridTemplateRows: ["responsive"],
        height: ["responsive", "hover"],
        hueRotate: ["responsive"],
        inset: ["responsive"],
        invert: ["responsive"],
        isolation: ["responsive"],
        justifyContent: ["responsive"],
        justifyItems: ["responsive"],
        justifySelf: ["responsive"],
        letterSpacing: ["responsive"],
        lineHeight: ["responsive"],
        listStylePosition: ["responsive"],
        listStyleType: ["responsive"],
        margin: ["responsive"],
        maxHeight: ["responsive"],
        maxWidth: ["responsive"],
        minHeight: ["responsive"],
        minWidth: ["responsive"],
        mixBlendMode: ["responsive"],
        objectFit: ["responsive"],
        objectPosition: ["responsive"],
        opacity: ["responsive", "group-hover", "focus-within", "hover", "focus", "disabled"],
        order: ["responsive"],
        outline: ["responsive", "focus-within", "focus"],
        overflow: ["responsive"],
        overscrollBehavior: ["responsive"],
        padding: ["responsive"],
        placeContent: ["responsive"],
        placeItems: ["responsive"],
        placeSelf: ["responsive"],
        placeholderColor: ["responsive", "dark", "focus"],
        placeholderOpacity: ["responsive", "dark", "focus"],
        pointerEvents: ["responsive"],
        position: ["responsive"],
        resize: ["responsive"],
        ringColor: ["responsive", "dark", "focus-within", "focus"],
        ringOffsetColor: ["responsive", "dark", "focus-within", "focus"],
        ringOffsetWidth: ["responsive", "focus-within", "focus"],
        ringOpacity: ["responsive", "dark", "focus-within", "focus"],
        ringWidth: ["responsive", "focus-within", "focus"],
        rotate: ["responsive", "hover", "focus"],
        saturate: ["responsive"],
        scale: ["responsive", "hover", "focus"],
        sepia: ["responsive"],
        skew: ["responsive", "hover", "focus"],
        space: ["responsive"],
        stroke: ["responsive"],
        strokeWidth: ["responsive"],
        tableLayout: ["responsive"],
        textAlign: ["responsive"],
        textColor: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus", "disabled"],
        textDecoration: ["responsive", "group-hover", "focus-within", "hover", "focus"],
        textOpacity: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus", "disabled"],
        textOverflow: ["responsive"],
        textTransform: ["responsive"],
        transform: ["responsive"],
        transformOrigin: ["responsive"],
        transitionDelay: ["responsive"],
        transitionDuration: ["responsive"],
        transitionProperty: ["responsive"],
        transitionTimingFunction: ["responsive"],
        translate: ["responsive", "hover", "focus"],
        userSelect: ["responsive"],
        verticalAlign: ["responsive"],
        visibility: ["responsive"],
        whitespace: ["responsive"],
        width: ["responsive"],
        wordBreak: ["responsive"],
        zIndex: ["responsive", "focus-within", "focus"],
        extend: {
            cursor: ["disabled"],
            textOpacity: ["disabled"],
            textColor: ["disabled"],
            textDecoration: ["focus-visible"],
            boxDecorationBreak: ["hover", "focus"],
            borderColor: ["checked"],
            borderWidth: ["last"],
            backgroundColor: ["odd", "even", "checked"],
        },
    },
    plugins: [require("flowbite")],
};

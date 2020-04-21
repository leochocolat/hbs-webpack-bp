import breakpoints from '../variables/breakpoints';

class MediaQueriesUtils {
    getBreakpoint(size) {
        const width = size.width;
        let breakpoint;

        if (width < breakpoints.narrow) {
            breakpoint = 'extra-narrow';
        } else if (width > breakpoints.narrow + 1 && width < breakpoints.regular) {
            breakpoint = 'narrow';
        } else if (width > breakpoints.regular + 1 && width < breakpoints.wide) {
            breakpoint = 'regular';
        } else if (width > breakpoints.regular + 1 && width < breakpoints.extraWide) {
            breakpoint = 'wide';
        } else if (width > breakpoints.extraWide + 1) {
            breakpoint = 'extra-wide';
        }

        return breakpoint;
    }

    isExtraNarrow() {
        width = window.innerWidth;
        return width < breakpoints.narrow;
    }

    isNarrow() {
        width = window.innerWidth;
        return width > breakpoints.narrow + 1 && width < breakpoints.regular;
    }

    isRegular() {
        width = window.innerWidth;
        return width > breakpoints.regular + 1 && width < breakpoints.wide;
    }

    isWide() {
        width = window.innerWidth;
        return width > breakpoints.regular + 1 && width < breakpoints.extraWide;
    }

    isExtraWide() {
        width = window.innerWidth;
        return width > breakpoints.extraWide + 1;
    }
}

export default new MediaQueriesUtils();
'use client';

import { usePathname } from 'next/navigation'
import { Page } from "@/types/Page";

export default function BottomNav() {
    const selectedIconColour = "#000000";
    const deselectedIconColour = "#8D8C8F";
    const segment = usePathname().split("/")[1] || "home";
    const currentPageEnum = Page[segment.toUpperCase() as keyof typeof Page];

    const defaultClassName = "inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-secondary-medium group";
    const homeClassName = currentPageEnum == Page.HOME ? `${defaultClassName} fill-primary` : `${defaultClassName} fill-primary-inactive`;
    const recordClassName = currentPageEnum == Page.RECORD ? `${defaultClassName} fill-primary` : `${defaultClassName} fill-primary-inactive`;
    const zonesClassName = currentPageEnum == Page.ZONES ? `${defaultClassName} stroke-primary` : `${defaultClassName} stroke-primary-inactive`;
    const settingsClassName = currentPageEnum == Page.SETTINGS ? `${defaultClassName} fill-primary` : `${defaultClassName} fill-primary-inactive`;

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-neutral-primary-soft border-t border-default">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <a href="/" className={homeClassName}>
                    <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.38574 0.210648C9.74685 -0.0702159 10.2531 -0.0702159 10.6143 0.210648L19.6143 7.21065C19.8577 7.40003 19.9999 7.69133 20 7.99971V18.9997C20 19.7954 19.6837 20.5592 19.1211 21.1218C18.5585 21.6842 17.7955 21.9997 17 21.9997H13V12.9997C12.9998 11.8953 12.1044 10.9997 11 10.9997H9C7.89556 10.9997 7.00021 11.8953 7 12.9997V21.9997H3C2.20449 21.9997 1.44149 21.6842 0.878906 21.1218C0.316297 20.5592 0 19.7954 0 18.9997V7.99971C0.000122148 7.69133 0.142349 7.40003 0.385742 7.21065L9.38574 0.210648Z" />
                    </svg>
                    <span className="text-sm text-body group-hover:text-fg-brand">Home</span>
                </a>
                <a href="/record" className={recordClassName}>
                    <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 23.3333V25C5 25.4722 4.84028 25.8681 4.52083 26.1875C4.20139 26.5069 3.80556 26.6667 3.33333 26.6667H1.66667C1.19444 26.6667 0.798611 26.5069 0.479167 26.1875C0.159722 25.8681 0 25.4722 0 25V11.6667L3.5 1.66667C3.66667 1.16667 3.96528 0.763889 4.39583 0.458333C4.82639 0.152778 5.30556 0 5.83333 0H24.1667C24.6944 0 25.1736 0.152778 25.6042 0.458333C26.0347 0.763889 26.3333 1.16667 26.5 1.66667L30 11.6667V25C30 25.4722 29.8403 25.8681 29.5208 26.1875C29.2014 26.5069 28.8056 26.6667 28.3333 26.6667H26.6667C26.1944 26.6667 25.7986 26.5069 25.4792 26.1875C25.1597 25.8681 25 25.4722 25 25V23.3333H5ZM4.66667 8.33333H25.3333L23.5833 3.33333H6.41667L4.66667 8.33333ZM7.5 18.3333C8.19444 18.3333 8.78472 18.0903 9.27083 17.6042C9.75694 17.1181 10 16.5278 10 15.8333C10 15.1389 9.75694 14.5486 9.27083 14.0625C8.78472 13.5764 8.19444 13.3333 7.5 13.3333C6.80556 13.3333 6.21528 13.5764 5.72917 14.0625C5.24306 14.5486 5 15.1389 5 15.8333C5 16.5278 5.24306 17.1181 5.72917 17.6042C6.21528 18.0903 6.80556 18.3333 7.5 18.3333ZM22.5 18.3333C23.1944 18.3333 23.7847 18.0903 24.2708 17.6042C24.7569 17.1181 25 16.5278 25 15.8333C25 15.1389 24.7569 14.5486 24.2708 14.0625C23.7847 13.5764 23.1944 13.3333 22.5 13.3333C21.8056 13.3333 21.2153 13.5764 20.7292 14.0625C20.2431 14.5486 20 15.1389 20 15.8333C20 16.5278 20.2431 17.1181 20.7292 17.6042C21.2153 18.0903 21.8056 18.3333 22.5 18.3333ZM3.33333 20H26.6667V11.6667H3.33333V20Z"/>
                    </svg>

                    <span className="text-sm text-body group-hover:text-fg-brand">Record</span>
                </a>
                <a href="/zones" className={zonesClassName}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_55_730)">
                        <path d="M10.6667 24L1.33337 29.3333V7.99999L10.6667 2.66666M10.6667 24L21.3334 29.3333M10.6667 24V2.66666M21.3334 29.3333L30.6667 24V2.66666L21.3334 7.99999M21.3334 29.3333V7.99999M21.3334 7.99999L10.6667 2.66666" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_55_730">
                        <rect width="32" height="32" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <span className="text-sm text-body group-hover:text-fg-brand">Zones</span>
                </a>
                <a href="/settings" className={settingsClassName}>
                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.125 25L8.625 21C8.35417 20.8958 8.09896 20.7708 7.85937 20.625C7.61979 20.4792 7.38542 20.3229 7.15625 20.1562L3.4375 21.7188L0 15.7812L3.21875 13.3438C3.19792 13.1979 3.1875 13.0573 3.1875 12.9219V12.0781C3.1875 11.9427 3.19792 11.8021 3.21875 11.6562L0 9.21875L3.4375 3.28125L7.15625 4.84375C7.38542 4.67708 7.625 4.52083 7.875 4.375C8.125 4.22917 8.375 4.10417 8.625 4L9.125 0H16L16.5 4C16.7708 4.10417 17.026 4.22917 17.2656 4.375C17.5052 4.52083 17.7396 4.67708 17.9688 4.84375L21.6875 3.28125L25.125 9.21875L21.9062 11.6562C21.9271 11.8021 21.9375 11.9427 21.9375 12.0781V12.9219C21.9375 13.0573 21.9167 13.1979 21.875 13.3438L25.0938 15.7812L21.6563 21.7188L17.9688 20.1562C17.7396 20.3229 17.5 20.4792 17.25 20.625C17 20.7708 16.75 20.8958 16.5 21L16 25H9.125ZM11.3125 22.5H13.7813L14.2188 19.1875C14.8646 19.0208 15.4635 18.776 16.0156 18.4531C16.5677 18.1302 17.0729 17.7396 17.5313 17.2812L20.625 18.5625L21.8438 16.4375L19.1562 14.4063C19.2604 14.1146 19.3333 13.8073 19.375 13.4844C19.4167 13.1615 19.4375 12.8333 19.4375 12.5C19.4375 12.1667 19.4167 11.8385 19.375 11.5156C19.3333 11.1927 19.2604 10.8854 19.1562 10.5938L21.8438 8.5625L20.625 6.4375L17.5313 7.75C17.0729 7.27083 16.5677 6.86979 16.0156 6.54688C15.4635 6.22396 14.8646 5.97917 14.2188 5.8125L13.8125 2.5H11.3437L10.9063 5.8125C10.2604 5.97917 9.66146 6.22396 9.10937 6.54688C8.55729 6.86979 8.05208 7.26042 7.59375 7.71875L4.5 6.4375L3.28125 8.5625L5.96875 10.5625C5.86458 10.875 5.79167 11.1875 5.75 11.5C5.70833 11.8125 5.6875 12.1458 5.6875 12.5C5.6875 12.8333 5.70833 13.1563 5.75 13.4688C5.79167 13.7813 5.86458 14.0938 5.96875 14.4063L3.28125 16.4375L4.5 18.5625L7.59375 17.25C8.05208 17.7292 8.55729 18.1302 9.10937 18.4531C9.66146 18.776 10.2604 19.0208 10.9063 19.1875L11.3125 22.5ZM12.625 16.875C13.8333 16.875 14.8646 16.4479 15.7187 15.5938C16.5729 14.7396 17 13.7083 17 12.5C17 11.2917 16.5729 10.2604 15.7187 9.40625C14.8646 8.55208 13.8333 8.125 12.625 8.125C11.3958 8.125 10.3594 8.55208 9.51563 9.40625C8.67188 10.2604 8.25 11.2917 8.25 12.5C8.25 13.7083 8.67188 14.7396 9.51563 15.5938C10.3594 16.4479 11.3958 16.875 12.625 16.875Z"/>
                    </svg>

                    <span className="text-sm text-body group-hover:text-fg-brand">Settings</span>
                </a>
            </div>
        </div>
    );
}


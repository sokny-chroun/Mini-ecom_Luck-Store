export type DateFormatPreset =
    | 'full'       // "January 15, 2024"
    | 'short'      // "Jan 15, 2024"
    | 'numeric'    // "01/15/2024"
    | 'iso'        // "2024-01-15"
    | 'relative'   // "2 days ago" or "in 3 months"
    | 'time'       // "January 15, 2024, 2:30 PM"
    | 'time-short' // "Jan 15, 2:30 PM"
    | 'datetime'   // "Jan 15, 2024, 2:30:45 PM"
    | 'month-year' // "January 2024"
    | 'day-month'  // "15 January";

interface FormatDateOptions {
    preset?: DateFormatPreset;
    locale?: string;
    timeZone?: string;
    includeTime?: boolean;
    includeSeconds?: boolean;
    customOptions?: Intl.DateTimeFormatOptions;
}

export function formatDate(
    dateInput: string | Date | number | null | undefined,
    options?: FormatDateOptions | DateFormatPreset
): string {
    // Handle null/undefined/empty values
    if (dateInput == null) return '';

    // Parse options
    const opts: FormatDateOptions = typeof options === 'string'
        ? { preset: options }
        : options || {};

    const { preset = 'full', locale = 'en-US', timeZone, customOptions } = opts;

    try {
        // Convert input to Date object
        const date = dateInput instanceof Date
            ? dateInput
            : new Date(dateInput);

        // Validate date
        if (Number.isNaN(date.getTime())) {
            return 'Invalid date';
        }

        // Apply preset configurations
        const presetConfigs: Record<DateFormatPreset, Intl.DateTimeFormatOptions> = {
            'full': { year: 'numeric', month: 'long', day: 'numeric' },
            'short': { year: 'numeric', month: 'short', day: 'numeric' },
            'numeric': { year: 'numeric', month: '2-digit', day: '2-digit' },
            'iso': { year: 'numeric', month: '2-digit', day: '2-digit' },
            'relative': { year: 'numeric', month: 'long', day: 'numeric' }, // Override below
            'time': {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            },
            'time-short': {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            },
            'datetime': {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            },
            'month-year': { year: 'numeric', month: 'long' },
            'day-month': { month: 'long', day: 'numeric' }
        };

        // Handle relative time format
        if (preset === 'relative') {
            return getRelativeTimeString(date, locale);
        }

        // Handle ISO format
        if (preset === 'iso') {
            return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
        }

        // Merge options
        const formatOptions: Intl.DateTimeFormatOptions = {
            ...presetConfigs[preset],
            ...(timeZone && { timeZone }),
            ...customOptions
        };

        return date.toLocaleDateString(locale, formatOptions);

    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
}

// Helper function for relative time
function getRelativeTimeString(date: Date, locale: string): string {
    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (Math.abs(diffInDays) > 30) {
        const diffInMonths = Math.floor(diffInDays / 30);
        if (Math.abs(diffInMonths) > 12) {
            const diffInYears = Math.floor(diffInMonths / 12);
            return rtf.format(diffInYears, 'year');
        }
        return rtf.format(diffInMonths, 'month');
    }

    if (Math.abs(diffInHours) > 24) {
        return rtf.format(diffInDays, 'day');
    }

    if (Math.abs(diffInMinutes) > 60) {
        return rtf.format(diffInHours, 'hour');
    }

    if (Math.abs(diffInSeconds) > 60) {
        return rtf.format(diffInMinutes, 'minute');
    }

    return rtf.format(diffInSeconds, 'second');
}
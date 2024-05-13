export function sanitizeData(str: string): string {
    return str.replace(/<[^>]+?>/g, '');
}

export function sprintf(format: string, ...args: any[]): string {
    let i = 0;
    return format.replace(/%s/g, function() {
        return args[i++];
    });
}
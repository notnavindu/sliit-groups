export const copyToClipboard = (str) => {
	navigator.clipboard.writeText(str);
	alert('Copied to clipboard');
};

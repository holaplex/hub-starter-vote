/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        cta: '#F3F36D',
        backdrop: '#1A1A1D',
        contrast: ' #212122',
        neautraltext: '#8B8B8E',
        subtletext: '#AAAAAA',
        cellsubtle: '#2B2B2B',
        success: '#628E36',
        failure: '#E4584F'
      }
    }
  },
  plugins: []
};

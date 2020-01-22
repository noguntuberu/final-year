/**
 * 
 */

export default {
    initializeStore: () => {
        return localStorage.getItem('store') ? 
               JSON.parse(localStorage.getItem('store')) : 
               {};
    },

    saveStore: (store) => {
        localStorage.setItem('store', JSON.stringify(store));
    }
}
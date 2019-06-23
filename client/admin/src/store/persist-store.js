/**
 * 
 */

export default {
    initializeStore: () => {
        return localStorage.getItem('admin_store') ? 
               JSON.parse(localStorage.getItem('admin_store')) : 
               {};
    },

    saveStore: (store) => {
        localStorage.setItem('admin_store', JSON.stringify(store));
    }
}
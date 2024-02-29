// 返回首頁
export const goHome = function goHome(vueInstance) {
    vueInstance.$router.push({ 
        name: 'home'
    // 須與index.js中首頁的名稱一致
    });
};
// get emp_id globally from localhost or any 

export const emp_id = () => {
    return localStorage.getItem('emp_Id');
};

export const URLS = {
    api_url: 'https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/',
};
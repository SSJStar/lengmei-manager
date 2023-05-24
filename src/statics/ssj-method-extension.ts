
/**
 * 精准搜索
 *
 *  作者：小青龙
 *  时间：2023/05/24 11:36:58
 *  说明：
 *      datas：数组
 *      key：搜索关键字
 *      attribute：要对数组元素哪个属性进行搜索（attribute为null或空字符串，则认为datas是字符串数组）
 */
export const preciseSearch = (datas,key,attribute)=> {
    let arr:Array<JSON> = []
    datas.forEach((item) => {
        if(attribute === null || attribute === ""){
            // 说明datas是字符串数组
            if(item === key){
                // @ts-ignore
                arr.push(item)
            }
        }else {
            // 说明datas是JSON数组
            if (item.nick_name === key){
                // @ts-ignore
                arr.push(item)
            }
        }
    })
    return new Promise(function (resolve){
        resolve(arr);
    });
};

/**
 * 模糊搜索
 *
 *  作者：小青龙
 *  时间：2023/05/24 11:15:22
 *  说明：
 *      datas：数组
 *      key：搜索关键字
 *      attribute：要对数组元素哪个属性进行搜索（attribute为null或空字符串，则认为datas是字符串数组）
 */
export const fuzzySearch = (datas,key,attribute)=> {
    let arr:Array<JSON> = []
    datas.forEach((item) => {
        const reg = new RegExp(key);
        if(attribute === null || attribute === ""){
            // 说明datas是字符串数组
            if(reg.test(item)){
                // @ts-ignore
                arr.push(item)
            }
        }else {
            // 说明datas是JSON数组
            if (reg.test(item[attribute])){
                // @ts-ignore
                arr.push(item)
            }
        }
    })
    return new Promise(function (resolve){
        resolve(arr);
    });
};
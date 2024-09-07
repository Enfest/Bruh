type Order = {
    id: number,
    order: number
};

const orderListToRecord = (orderList: Order[], idKey: string) => {
    return orderList.reduce((record: Record<number, [number, number]>, item: Order) => {
        record[(item as Record<string, number>)[idKey]] = [item.id, item.order];
        return record;
    }, {});
}


export { orderListToRecord };
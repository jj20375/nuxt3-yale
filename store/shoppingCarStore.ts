import { defineStore } from "pinia";
import type { CartItem, ShoppingCarInterface } from "~/interface/shoppingCar";
import { getShoppingCar } from "~/service/shoppingCar";

export const useShoppingCarStore = defineStore(
  "shoppingCarStore",
    () => {
        const { $api, $shoppingCarService } = useNuxtApp();

        // 購物車
        const shoppingCar: Ref<ShoppingCarInterface[]> = ref([])

        // 設定購物車
        const setShoppingCar = (val: any) =>{
            shoppingCar.value = [...val]
        }

        // 取得購物車
        const getUserShopping = async() => {
            const token = useCookie('token').value
            if(token) {
                $api().GetCart().then((res)=>{
                    if(res.data) {
                        // console.log('res.data.cartItems',res.data.cartItems)
                        shoppingCar.value =  res.data.cartItems.map(i=>{
                            return {
                                id: i.original.id,
                                price: i.original.price,
                                name: i.original.name,
                                mark: i.original.mark,
                                imgSrc: `https://yale_backed.mrjin.me/storage/${i.original.main_image}`,
                                count: i.quantity,
                                totalPrice: Number(i.original.price) * i.quantity
                            }
                        })
                        console.log(' shoppingCar.value', shoppingCar.value)
                        $shoppingCarService().setShoppingCar(shoppingCar.value);
                    }
                })
                return
            } else {
                const temp =  getShoppingCar()
                shoppingCar.value = temp ? temp : []
            }
          
        }

        // 加入購物車
        const addToCart = (data: ShoppingCarInterface) => {
            // localStorage setting
            $shoppingCarService().addToShoppingCar(data);
            const apiReq : CartItem = {
                product_id: data.id,
                quantity: data.count,
            }
            $api().AddToCart(apiReq).then((res)=>{
                // console.log('res', res.data.data.cartItems)
            })
        }

        // 更新購物車
        const updateCart = (data:ShoppingCarInterface) => {
            const apiReq = {
                cart_item_id: data.id,
                quantity: data.count,
            }
            $api().UpdateCart(apiReq).then((res)=>{
                // console.log('res', res.data.data.cartItems)
            })
        }

        // 更新 localStorage
        // watch(shoppingCar, (val) => {
        //         console.log('val,', val)
        //         if(val.length > 0) {
        //             $shoppingCarService().setShoppingCar(val);
        //         }
        //     },
        //     { deep: true }
        // )

        return {
            shoppingCar,
            setShoppingCar,
            addToCart,
            updateCart,
            getUserShopping
        }
    }
);

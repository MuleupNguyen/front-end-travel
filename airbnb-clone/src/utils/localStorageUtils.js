// thêm cart tour vào localstorage
export const addCartTourToLocal = (cart) => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    // Lấy dữ liệu từ localStorage (nếu có) và chuyển đổi từ chuỗi JSON thành mảng

    const updatedItems = [...storedItems, {
        id: cart.idCard,
        tour: cart,
        quantityAdult: 1,
        quantityChild: 0,
        total_price: cart.price,
        status: "Chưa thanh toán"
    }];

    // Lưu mảng dữ liệu mới vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));
}
// xóa cart tour khỏi localstorage
export const removeCartTourFromLocal = (id) => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Lọc ra các mặt hàng khác với mặt hàng có idCard tương ứng
    const updatedItems = storedItems.filter((item) => item.id !== id);

    // Lưu mảng dữ liệu mới vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));
}
// cập nhật cart tour trong localstorage

export const updateCartTourInLocal = (id, quantityAdult, quantityChild, total_price) => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedItems = storedItems.map((item) => {
        if (item.id === id) {
            const updatedQuantityAdult = isNaN(quantityAdult) || quantityAdult === null ? 1 : quantityAdult;
            const updatedQuantityChild = isNaN(quantityChild) || quantityChild === null ? 0 : quantityChild;
            return {
                ...item,
                quantityAdult: updatedQuantityAdult,
                quantityChild: updatedQuantityChild,
                total_price: total_price
            };
        }
        return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedItems));
};

// thêm tour vào localstorage
export const addTourToLocal = (tour) => {
     const storedItems = JSON.parse(localStorage.getItem("viewedTours")) || [];

  // Kiểm tra xem tour đã tồn tại trong storedItems hay chưa
  const tourExists = storedItems.some((item) => item.id === tour.id);

  if (!tourExists) {
    const updatedItems = [
      ...storedItems,
      {
        id: tour.id,
        name: tour.name,
        image: tour.image,
        price: tour.price_adult
      }
    ];

    // Lưu mảng dữ liệu mới vào localStorage
    localStorage.setItem("viewedTours", JSON.stringify(updatedItems));
  }
}
// xóa cart tour khỏi localstorage
export const removeTourFromLocal = (id) => {
    const storedItems = JSON.parse(localStorage.getItem("viewedTours")) || [];

    // Lọc ra các mặt hàng khác với mặt hàng có idCard tương ứng
    const updatedItems = storedItems.filter((item) => item.id !== id);

    // Lưu mảng dữ liệu mới vào localStorage
    localStorage.setItem("viewedTours", JSON.stringify(updatedItems));
}

export const getToursFromLocal = () => {
  const viewedTours = JSON.parse(localStorage.getItem("viewedTours")) || [];
  const firstThreeTours = viewedTours.slice(0, 3);
  return firstThreeTours;
};

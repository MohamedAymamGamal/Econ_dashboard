import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';


interface Collection {
  label: string;
  description: string;
  image: string;
  alt: string;
}
@Component({
  selector: 'app-featured-collections',
  imports: [NgOptimizedImage],
  templateUrl: './featured-collections.html',
  styleUrl: './featured-collections.css',
})
export class FeaturedCollections {


  collections: Collection[] = [
    {
      label: 'Apparel',
      description: 'Timeless garments for the modern wardrobe.',
      alt: 'Apparel',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLwX1yq9J-c2gBx2EjAYEYx1jxSWcQwTTt7WRneb9KzAbMA37NuzmKdOwx-_cxFMA2uttZUUgBR70KPnA9I6NXHv-CW_7vh4FSGu5-J9fL8U-U42Gy67fbdUPUKMWf0GRVf7yRtpKlE6fQRgp2GJxriPVsc_p4KBSUYVPU_LK3MJMVd0goUMLMbNnL92aBJKk3nGk95uT092W4h_FKKYvV3mE9kt0CuXxXGP0l14_FoVuB9tW3PNr8bhJ5tV1PbcdV1loyEH_O8KY',
    },
    {
      label: 'Tech',
      description: 'Precision-engineered devices.',
      alt: 'Tech',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvl8vWRKP9aL_rkCidmfx4Ye4ZvgFtWP3Pp6jS5QyKEK-hw8QlvWh2iJ3w11Ql7ZBcj0xs7L2DmTHuZVNhEjmaS2Gy0lQK2L6yfVYYRD0N9EATsevU93vcGJGYdmdZI1DizwX4vAtk9gNOlZIpjt8KhZDMfLSV_UFs5KnHoMJ5sq1jYT9XEVSZYF9kWRYyZ_3RjY3WArFGpr_3DjuPJy745spKGAXAsT-NdYAn-5iYMxPkIbNtLurnh_61mvrmevrbszDXPYeknW8',
    },
    {
      label: 'Accessories',
      description: 'The final touch to your aesthetic.',
      alt: 'Accessories',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeaBiDg6pW8CJF9zsu1-yL6WbbwqFsopvtHE9EJSLNduMPIVdNsOjOb7QpGSLXubTMY86tAgt44u3mBnT9EgIVy8k1jO_5MJ9n1RasYJJtr3rd2CmsegMd59W0hBmx3XelOHN4B4XV7SZWVga7hRrnEQxTX9wKROuhbJhEEgNO3L1NvxwqkUah97Z0RbkZbbEjENYUgAcdgJXt21gDzuUD7wWXIzZgh12i3HhpUqJ_SUwVDXAZlsziMea1ed1wecP9S56-IQPq3YA',
    },
  ];
  
}

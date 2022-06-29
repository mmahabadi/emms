import {KTSVG} from "@emms/ui-kit";
import React, {FC} from "react";

export const AssetsHeader: FC = () => {
  return (
    <div className='card mb-10'>
      <div className='card-body d-flex align-items-center py-8'>
        {/* begin::Icon */}
        <div className='d-flex h-80px w-80px flex-shrink-0 flex-center position-relative'>
          <KTSVG
            path='/media/icons/duotune/abstract/abs051.svg'
            className='svg-icon-primary position-absolute opacity-15'
            svgClassName='h-80px w-80px'
          />
          <KTSVG
            path='/media/icons/duotune/coding/cod009.svg'
            className='svg-icon-3x svg-icon-primary position-absolute'
          />
        </div>
        {/* end::Icon */}

        {/* begin::Description */}
        <div className='ms-6'>
          <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
        {/* end::Description */}
      </div>
    </div>
  );
}

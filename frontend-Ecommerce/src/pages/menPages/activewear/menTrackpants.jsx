 
import ProductListingPage from '../../ProductListPage';
import { useGetAllSubCategoriesQuery, useGetSubCategoriesWithGenderQuery } from '../../../store/ApiProductFetch';

export default function MenPants() {
  return (
    <ProductListingPage
      gender="men"
    //   category = ""
      subCategory="TRACK-PANTS"
      title="Men's TRACK-PANTS"
      discountText="Save 15% on any MEN's ACTIVE-WEAR with Code 'BEING-MEN'"
      apiQuerySubCategoriesWithGenderHook={useGetSubCategoriesWithGenderQuery}
      apiQueryAllSubCategoriesHook = {useGetAllSubCategoriesQuery}
    />
  );
}


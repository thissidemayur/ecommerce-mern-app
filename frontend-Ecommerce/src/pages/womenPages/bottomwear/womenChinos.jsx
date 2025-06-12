 
 
 
 
 
 
 
import ProductListingPage from '../../ProductListPage';
import { useGetAllSubCategoriesQuery, useGetSubCategoriesWithGenderQuery } from '../../../store/ApiProductFetch';

export default function MenPants() {
  return (
    <ProductListingPage
      gender="women"
    //   category = "CHINOS"
      subCategory="CHINOS"
      title="Women's CHINOS"
      discountText="Save 15% on any WOMEN's BOTTOMWEAR with Code 'BEING-WEAR'"
      apiQuerySubCategoriesWithGenderHook={useGetSubCategoriesWithGenderQuery}
      apiQueryAllSubCategoriesHook = {useGetAllSubCategoriesQuery}
    />
  );
}

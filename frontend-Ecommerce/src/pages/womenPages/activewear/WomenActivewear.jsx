 
 
 
 
import ProductListingPage from '../../ProductListPage';
import { useGetAllSubCategoriesQuery, useGetSubCategoriesWithGenderQuery } from '../../../store/ApiProductFetch';

export default function MenPants() {
  return (
    <ProductListingPage
      gender="women"
      category = "ACTIVE WEAR"
    //   subCategory="ACTIVESHORTS"
      title="Women's ActiveWear"
      discountText="Save 15% on any WOMEN's ACTIVEWEAR with Code 'BEING-WOMEN'"
      apiQuerySubCategoriesWithGenderHook={useGetSubCategoriesWithGenderQuery}
      apiQueryAllSubCategoriesHook = {useGetAllSubCategoriesQuery}
    />
  );
}

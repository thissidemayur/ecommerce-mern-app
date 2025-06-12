 
import ProductListingPage from '../../ProductListPage';
import { useGetAllSubCategoriesQuery, useGetSubCategoriesWithGenderQuery } from '../../../store/ApiProductFetch';

export default function MenPants() {
  return (
    <ProductListingPage
      gender="women"
      subCategory="HEELS"
      title="Women's HEELS"
      discountText="Save 15% on any WOMEN's FOOTWEAR with Code 'BEING-WEAR'"
      apiQuerySubCategoriesWithGenderHook={useGetSubCategoriesWithGenderQuery}
      apiQueryAllSubCategoriesHook = {useGetAllSubCategoriesQuery}
    />
  );
}

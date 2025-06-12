import ProductListingPage from '../../ProductListPage';
import { useGetAllSubCategoriesQuery, useGetSubCategoriesWithGenderQuery } from '../../../store/ApiProductFetch';

export default function MenPants() {
  return (
    <ProductListingPage
      gender="men"
      category = "JUMPS-SUITS"
    //   subCategory="SWEAT-PANTS"
      title="Men's JUMPS-SUITS"
      discountText="Save 15% on any MEN's PANTS with Code 'BEING-MEN-PANT'"
      apiQuerySubCategoriesWithGenderHook={useGetSubCategoriesWithGenderQuery}
      apiQueryAllSubCategoriesHook = {useGetAllSubCategoriesQuery}
    />
  );
}

import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import { Empty } from "../../../Components/Notfications/Empty";
import { CategoriesData } from "../../../Data/FilterData";
// import { useGetAllCategoriesReducer } from "../../../Actions/Reducers";

function Categories() {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [category, setCategory] = useState();

  // const [categoriesState, categoriesDispatch] = useGetAllCategoriesReducer();

  // const {  isLoading, isError, categories } = categoriesState
  // all categories
  // // delete category
  // const { isSuccess, isError } = useSelector((state) => state.categoryDelete);
  // const adminDeletecategory = (id) => {
  //   if (window.confirm("Are you sure you want to delete this category")) {
  //     dispatch(deleteCategoryAction(id));
  //   }
  // };

  // const OnEditFunction = (id) => {
  //   setCategory(id);
  //   setModalOpen(!modalOpen);
  // };

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(isError);
  //     dispatch({ type: "DELETE_CATEGORY_RESET" });
  //   }
  //   if (isSuccess) {
  //     dispatch({ type: "DELETE_CATEGORY_RESET" });
  //   }

  //   if (modalOpen === false) {
  //     setCategory();
  //   }
  // }, [modalOpen, dispatch, isError, isSuccess]);

  return (
    <SideBar>
      {/* <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      /> */}
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
        </div>

        { CategoriesData?.length > 0 ? (
          <Table2
            data={CategoriesData}
            users={false}
          />
        ) : (
          <Empty message="You have no categories" />
        )}
      </div>
    </SideBar>
  );
}

export default Categories;

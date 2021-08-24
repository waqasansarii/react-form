import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useHistory, useLocation } from "react-router-dom";

function valuetext(value) {
  return `${value}$`;
}

const formField = {
  province: "",
  city: "",
  // extra_expenses_per_month_lte: "",
  // extra_expenses_per_month_gte: "",
  lenght_of_lease: "",
  room_type: "",
  poster_uni: "",
  poster_uni_major: "",
  poster_profession: "",
  rent_per_month_sort: "",
  length_of_lease_sort: "",
  earliest_move_in_date_sort: "",
  is_furnished: "",
  is_laundry_ensuite: "",
  is_air_conditioned: "",
};

const Form = () => {
  // const classes = useStyles();
  const history = useHistory();
  const { search } = useLocation();

  // range slider's state
  const [rentSlider, setRentSlider] = React.useState([600, 1250]);
  const [EarliestMoveSlider, setEarliestMoveSlider] = React.useState([20, 60]);
  const [LengthLeaseSlider, setLengthLeaseSlider] = React.useState([4, 12]);
  // rent range slider function
  const handleChange = (event, newValue) => {
    setRentSlider(newValue);
  };
  const handleMinRent = (e) => {
    setRentSlider([e.target.value, rentSlider[1]]);
    // EarliestMoveSlider[0]=e.target.value
  };
  //  max rent change with input
  const handleMaxRent = (e) => {
    setRentSlider([rentSlider[0], e.target.value]);
  };

  // expenses slider function
  const handleExtraExpensesSlider = (event, newValue) => {
    setEarliestMoveSlider(newValue);
  };
  //  min expenses change with input
  const handleMinExpenses = (e) => {
    setEarliestMoveSlider([e.target.value, EarliestMoveSlider[1]]);
    // EarliestMoveSlider[0]=e.target.value
  };
  //  max expenses change with input
  const handleMaxExpenses = (e) => {
    setEarliestMoveSlider([EarliestMoveSlider[0], e.target.value]);
  };

  // length lease slider function
  const handleLengthLeaseSlider = (event, newValue) => {
    setLengthLeaseSlider(newValue);
  };

  // max lease change with input
  const handleMaxlease = (e) => {
    setLengthLeaseSlider([LengthLeaseSlider[0], e.target.value]);
  };

  // min lease change with input
  const handleMinlease = (e) => {
    setLengthLeaseSlider([e.target.value, LengthLeaseSlider[1]]);
  };

  // input field values and select function
  const [inputValues, setInputValues] = React.useState(formField);
  const handleInpueSelect = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputValues, rentSlider, EarliestMoveSlider, LengthLeaseSlider);
    let {
      city,
      earliest_move_in_date_sort,
      is_air_conditioned,
      is_furnished,
      is_laundry_ensuite,
      lenght_of_lease,
      length_of_lease_sort,
      poster_profession,
      poster_uni,
      poster_uni_major,
      province,
      rent_per_month_sort,
      room_type,
    } = inputValues;
    let url = new URLSearchParams(
      `city__iexact=${city}&province__iexact=${province}&rent_per_month__lte=${rentSlider[1]}&rent_per_month__gte=${rentSlider[0]}&extra_expenses_per_month__lte=${EarliestMoveSlider[1]}&extra_expenses_per_month__gte=${EarliestMoveSlider[0]}&earliest_move_in_date__iexact=${earliest_move_in_date_sort}&length_of_lease__lte=${LengthLeaseSlider[1]}&length_of_lease__gte=${LengthLeaseSlider[0]}&room_type=${room_type}&is_furnished=${is_furnished}&is_laundry_ensuite=${is_laundry_ensuite}&is_air_conditioned=${is_air_conditioned}&poster__university__iexact=${poster_uni}&poster__university_major__iexact=${poster_uni_major}&poster__profession__iexact=${poster_profession}&rent_per_month_sort=${rent_per_month_sort}&length_of_lease_sort=${length_of_lease_sort}&earliest_move_in_date_sort=${earliest_move_in_date_sort}`
    );
    history.push({
      pathname: "api/listings/",
      search: `${url}`,
    });
    setInputValues(formField);
  };

  return (
    <div className="form_container">
      <div className="form_md">
        <div className="head">
          <h2>Field Filters</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          // action="http://localhost:3002/formData"
          className="filter_form"
        >
          <div className="inputs">
            <label htmlFor="province">
              Province
              <br />
              <input
                type="text"
                name="province"
                id="province"
                placeholder="Province"
                value={inputValues.province}
                onChange={handleInpueSelect}
              />
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="city">
              City
              <br />
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                required
                onChange={handleInpueSelect}
              />
            </label>
          </div>
          <div className="inputs">
            <Typography id="range-slider" gutterBottom>
              Rent per month
            </Typography>
            <div className="range_boxes">
              <label htmlFor="">
                <input
                  type="text"
                  value={`${rentSlider[0]}`}
                  onChange={handleMinRent}
                />
              </label>
              <label htmlFor="">
                <input
                  type="text"
                  value={`${rentSlider[1]}`}
                  onChange={handleMaxRent}
                />
              </label>
            </div>
            <Slider
              value={rentSlider}
              onChange={handleChange}
              name="rent_per_month_range"
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              min={0}
              max={5000}
            />
          </div>

          <div className="inputs">
            <Typography id="range-slider" gutterBottom>
              Extra expenses per month
            </Typography>
            <div className="range_boxes">
              <label htmlFor="">
                <input
                  type="text"
                  value={`${EarliestMoveSlider[0]}`}
                  onChange={handleMinExpenses}
                />
              </label>
              <label htmlFor="">
                <input
                  type="text"
                  value={`${EarliestMoveSlider[1]}`}
                  onChange={handleMaxExpenses}
                />
              </label>
            </div>
            <Slider
              value={EarliestMoveSlider}
              onChange={handleExtraExpensesSlider}
              name="extra_expenses_per_month"
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              min={0}
              max={500}
            />
          </div>
          <div className="inputs">
            <label htmlFor="extra_expenses_per_month_gte">
              Earliest move in date
              <br />
              <input
                type="date"
                name="earliest_move_in_date"
                id="earliest_move_in_date"
                onChange={handleInpueSelect}
              />
            </label>
          </div>

          <div className="inputs">
            <Typography id="range-slider" gutterBottom>
              Length of lease Range
            </Typography>
            <div className="range_boxes">
              <label htmlFor="">
                <input
                  type="text"
                  value={`${LengthLeaseSlider[0]}`}
                  onChange={handleMinlease}
                />
              </label>
              <label htmlFor="">
                <input
                  type="text"
                  value={`${LengthLeaseSlider[1]}`}
                  onChange={handleMaxlease}
                />
              </label>
            </div>
            <Slider
              value={LengthLeaseSlider}
              onChange={handleLengthLeaseSlider}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              min={0}
              max={12}
            />
          </div>
          <div className="inputs">
            <label htmlFor="room_type">
              Room type
              <br />
              <select
                name="room_type"
                id="room_type"
                onChange={handleInpueSelect}
              >
                <option value="unknow">Choose a room type</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Shared Bedroom">Shared Bedroom</option>
                <option value="Den">Den</option>
                <option value="Living Room">Living Room</option>
                <option value="Shared Living Room">Shared Living Room</option>
                <option value="Sunroom">Sunroom</option>
                <option value="Closet">Closet</option>
              </select>
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="is_furnished">
              <input
                className="inp_check"
                type="checkbox"
                name="is_furnished"
                id="is_furnished"
                onChange={handleInpueSelect}
              />
              Furnished
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="is_air_conditioned">
              <input
                className="inp_check"
                type="checkbox"
                name="is_air_conditioned"
                id="is_air_conditioned"
                onChange={handleInpueSelect}
              />
              Air Conditioned
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="is_laundry_ensuite">
              <input
                className="inp_check"
                type="checkbox"
                name="is_laundry_ensuite"
                id="is_laundry_ensuite"
                onChange={handleInpueSelect}
              />
              Ensuite Laundry
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="poster_uni">
              Poster's University
              <br />
              <input
                type="text"
                name="poster_uni"
                id="poster_uni"
                onChange={handleInpueSelect}
              />
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="poster_uni_major">
              Poster's University Major
              <br />
              <input
                type="text"
                name="poster_uni_major"
                id="poster_uni_major"
                onChange={handleInpueSelect}
              />
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="poster_profession">
              Poster's Profession
              <br />
              <input
                type="text"
                name="poster_profession"
                id="poster_profession"
                onChange={handleInpueSelect}
              />
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="rent_per_month_sort">
              Rent per month ascending/descending
              <br />
              <select
                name="rent_per_month_sort"
                id="rent_per_month_sort"
                onChange={handleInpueSelect}
              >
                <option value="">Choose ascending/descending</option>
                <option value="rent_per_month">ascending &#8593; </option>
                <option value="-rent_per_month">descending &#8595; </option>
              </select>
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="length_of_lease_sort">
              Length of lease ascending/descending
              <br />
              <select
                name="length_of_lease_sort"
                id="length_of_lease_sort"
                onChange={handleInpueSelect}
              >
                <option value="">Choose ascending/descending</option>
                <option value="length_of_lease_sort">ascending &#8593; </option>
                <option value="-length_of_lease_sort">
                  descending &#8595;{" "}
                </option>
              </select>
            </label>
          </div>
          <div className="inputs">
            <label htmlFor="earliest_move_in_date_sort">
              Earliest move in date ascending/descending
              <br />
              <select
                name="earliest_move_in_date_sort"
                id="earliest_move_in_date_sort"
                onChange={handleInpueSelect}
              >
                <option value="">Choose ascending/descending</option>
                <option value="earliest_move_in_date_sort">
                  ascending &#8593;{" "}
                </option>
                <option value="-earliest_move_in_date_sort">
                  descending &#8595;{" "}
                </option>
              </select>
            </label>
          </div>
          <button type="submit" className="submit_btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;

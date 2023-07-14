import React from "react";
import { useTranslation } from "react-i18next";

import searchIcon from "../../../assets/icons/shared/search.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/shared/plus.svg";
import {
  AddButton,
  AddButtonSvg,
  Search,
  SearchImg,
  SearchInput,
} from "../../../theme/global";
import { pages } from "../../../utils/constants/pages";

export default function TransferList() {
  const { t } = useTranslation();

  return (
    <div>
      <Search>
        <SearchInput
          type="text"
          placeholder={t("CASH.SEARCH_TRANSFER")}
        ></SearchInput>
        <SearchImg src={searchIcon} alt="search" />
      </Search>
      <AddButton to={`${pages.newTransaction.transfer}/all`}>
        <AddButtonSvg as={PlusIcon} />
        {t("CASH.ADD_TRANSFER")}
      </AddButton>
      Transfers
    </div>
  );
}

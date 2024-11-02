import CardList from "@/components/Cards/CardList";
import CreateTodoModal from "@/components/UI/modal/CreateTodoModal";
import Portal from "../../UI/modal/ModalPotal";
import useModal from "@/hooks/modal/useModal";
import { useEffect } from "react";
import useCardsStore from "@/store/cardsStore";
import AddCardButton from "./AddCardButton";
import ColumnHeader from "./ColumnHeader";
import { useColumnStore } from "@/store/columnStore";

interface ColumnProps {
  id: number;
  title: string;
  onRefresh: () => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, onRefresh }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { cards, fetchCards, addCard, updateCard, deleteCard } =
    useCardsStore();
  const { setColumnId } = useColumnStore();

  useEffect(() => {
    fetchCards(id);
    setColumnId(id);
  }, [id, fetchCards, setColumnId]);

  return (
    <div className="columnList flex-1 h-[1010px] pt-4 pb-0 px-3 sm:border-b border-r border-[gray600]">
      <ColumnHeader title={title} columnId={id} onRefresh={onRefresh} />
      <AddCardButton onClick={openModal} />
      <CardList
        cards={cards[id] || []}
        title={title}
        onUpdateCard={(updatedCard) => updateCard(id, updatedCard)}
        onDeleteCard={(cardId) => deleteCard(id, cardId)}
        onRefresh={onRefresh}
      />
      {isOpen && (
        <Portal>
          <CreateTodoModal
            isOpen={isOpen}
            onClose={closeModal}
            onCreateCard={(newCard) => addCard(id, newCard)}
          />
        </Portal>
      )}
    </div>
  );
};

export default Column;

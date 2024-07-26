import { render } from "@testing-library/react";
import { Modal } from "../src/components/Modal";

describe('Tests component Modal', () => {
    test('Should render component', () => {
        render(<Modal onClose={() => console.log()}>children</Modal>);
    });
})
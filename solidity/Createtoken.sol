pragma solidity ^0.8.7;

contract CreatedToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Bixos Air Control", "UBSXAIR") {
        _mint(_msgSender(), initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}

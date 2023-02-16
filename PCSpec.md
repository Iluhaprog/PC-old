# NovPC Specification

This pc from scratch created with logic gates.

In this generation PC consists from several modules:

1. RAM
2. Control Unit
3. ALU
4. Commands counter
5. Opcode register
6. Operand registers A and B
7. User address register
8. Result register 
9. Flags register 

**Optional**:

10. Input register
11. Output register
12. Optional register **[2x]**

> Immediate will be 8-bit

> Register numbers will be 4-bit

> Opcode will be 4-bit

## Instructions set:

1. **SET [000000]** [*r1*], [*immediate*]; **(set immediate value to register)**
2. **MOV [000001]** [*r1*],[*r2*]; **(set value from register r1 to register r2)**
3. **RD [000010]** [*r1*],[*a1*]; **(read value from address a1 into register r1)**
4. **WT [000011]** [*r1*],[*a1*]; **(write value from register r1 into address a1)**
5. **ADD [000100]** [*r1*] **(get sum into register r1)**
6. **SUB [000101]** [*r1*] **(get sub into register r1)**
7. **CON [000110]** [*r1*] **(get conjunction into register r1)**
8. **DIS [000111]** [*r1*] **(get disjunction into register r1)**
9. **NEG [001000]** [*r1*] **(get negation into register r1)**
10. **COM [001001]** **(compare values in registers A and B and save result into flag register)**
11. **JMP [001010]** [*a1*] **(jump into address a1)**
12. **CJM [001011]** [*f1*] [*a1*] **(jump into address a1 if flags code have true for one of flags)** 
    - Flag can have next values:
    - 1. `1000` =>  **[A = B]** 
    - 2. `0100` =>  **[A < B]**
    - 3. `0010` =>  **[A > B]**
13. **END [001100]** 
14. **IN [001101]**
15. **OUT [001110]**

Also memory architecture can be looks like:

- *[* **opcode (6-bit)** *|* **r1 (4-bit)** *|* **r2 (4-bit)** *|* **im (8-bit)** *]* - common structure of command in memory
- *[* **opcode (6-bit)** *|* **r1/f1 (4-bit)** *|* **addr (12-bit)** *]* - structure of command with address in memory

> Max supported memory size is **4kB**

## Architecture of Control Unit:

> It must be modular so i can expand functionality of control unit.





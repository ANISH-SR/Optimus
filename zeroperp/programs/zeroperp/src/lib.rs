use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("FF51h2MwJQUNxUAKN8CXJJSNDni5jCNXb2GzAQT1D7jy");

#[program]
pub mod zeroperp {
    use super::*;

    pub fn initialize_vault(ctx: Context<InitializeVault>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.authority = *ctx.accounts.user.key;
        vault.total_collateral = 0;
        Ok(())
    }

    pub fn init_user_margin(ctx: Context<InitUserMargin>) -> Result<()> {
        let user_margin = &mut ctx.accounts.user_margin;
        user_margin.owner = *ctx.accounts.user.key;
        user_margin.collateral = 0;
        user_margin.has_active_position = false;
        user_margin.active_commitment = [0; 32];
        Ok(())
    }

    pub fn deposit_margin(ctx: Context<DepositMargin>, amount: u64) -> Result<()> {
        let user_margin = &mut ctx.accounts.user_margin;
        
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.key(),
            system_program::Transfer {
                from: ctx.accounts.user.to_account_info(),
                to: ctx.accounts.vault.to_account_info(),
            },
        );
        system_program::transfer(cpi_context, amount)?;

        user_margin.collateral = user_margin.collateral.checked_add(amount).unwrap();
        
        Ok(())
    }

    pub fn open_position(ctx: Context<OpenPosition>, commitment: [u8; 32]) -> Result<()> {
        let user_margin = &mut ctx.accounts.user_margin;
        
        require!(!user_margin.has_active_position, ZeroPerpError::PositionAlreadyOpen);
        require!(user_margin.collateral > 0, ZeroPerpError::InsufficientMargin);

        user_margin.active_commitment = commitment;
        user_margin.has_active_position = true;
        
        Ok(())
    }

    pub fn liquidate(ctx: Context<Liquidate>, _proof: Vec<u8>, _public_inputs: Vec<[u8; 32]>) -> Result<()> {
        let target_margin = &mut ctx.accounts.target_margin;
        
        require!(target_margin.has_active_position, ZeroPerpError::NoActivePosition);
        
        // MOCK VERIFICATION for Hackathon
        
        target_margin.collateral = 0;
        target_margin.has_active_position = false;
        target_margin.active_commitment = [0; 32];
        
        Ok(())
    }
}

// ================= ACCOUNTS =================

#[derive(Accounts)]
pub struct InitializeVault<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8,
        seeds = [b"vault"],
        bump
    )]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitUserMargin<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8 + 32 + 1,
        seeds = [b"user_margin", user.key().as_ref()],
        bump
    )]
    pub user_margin: Account<'info, UserMargin>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositMargin<'info> {
    #[account(mut, seeds = [b"user_margin", user.key().as_ref()], bump)]
    pub user_margin: Account<'info, UserMargin>,
    
    /// CHECK: PDA vault
    #[account(mut, seeds = [b"vault"], bump)]
    pub vault: AccountInfo<'info>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct OpenPosition<'info> {
    #[account(mut, seeds = [b"user_margin", user.key().as_ref()], bump)]
    pub user_margin: Account<'info, UserMargin>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Liquidate<'info> {
    #[account(mut)]
    pub target_margin: Account<'info, UserMargin>,
    #[account(mut)]
    pub liquidator: Signer<'info>,
}

// ================= STATE =================

#[account]
pub struct Vault {
    pub authority: Pubkey,
    pub total_collateral: u64,
}

#[account]
pub struct UserMargin {
    pub owner: Pubkey,
    pub collateral: u64,
    pub active_commitment: [u8; 32], 
    pub has_active_position: bool,
}

// ================= ERROR =================

#[error_code]
pub enum ZeroPerpError {
    #[msg("Invalid ZK Proof")]
    InvalidProof,
    #[msg("Insufficient Margin")]
    InsufficientMargin,
    #[msg("Position Already Open")]
    PositionAlreadyOpen,
    #[msg("No Active Position")]
    NoActivePosition,
}
